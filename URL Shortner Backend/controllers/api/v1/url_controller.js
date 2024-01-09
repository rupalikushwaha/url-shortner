//importing Url model
import Url from "../../../models/Url.js";



//importing user model
import User from "../../../models/User.js";

//importing logger
import { log } from "../../../middlewares/logger_middleware.js";

// importing the valid url module to validate the url
import validUrl from "valid-url";

// importing nanoid to generate unique codes
import { customAlphabet } from "nanoid";


// to create new short code for the given url
const shorten = async (req, res) => {
    try {
        // checking if the user exists
        const user = await User.findById(req.user._id);
        if(!user) return res.status(404).json({message:"User not found!"});
        // destructuring url from request body
        const { url } = req.body;
        // if no url is provided
        if (!url) return res.status(400).json({ message: "No Url Provided!" });
        // to check that the provided url is valid or not
        if (!validUrl.isUri(url)) return res.status(400).json({ message: "Invalid Url!" });
        // to check if short code for given url already exists
        const existing = await Url.findOne({ original: url });
        // if short code already exists
        if (existing){

            let shortUrl = `${req.protocol}://${req.get('host')}/${existing.code}`;
            return res.status(200).json({ shortUrl: shortUrl, original: existing.original, message: "Short code already exists!" });
        } 
        // generating new short code
        const uniqueCode = generateUniqueCode();
        const shortUrl = `${req.protocol}://${req.get('host')}/${uniqueCode}`;
        // saving code and original url in the database
        const newUrl = await Url.create({ original: url, code: uniqueCode, user: req.user });
        // if unable to create a entry in the database
        if (!newUrl) return res.status(400).json({ message: "Unable to create short Url" });
        user.urls.push(newUrl);
        user.save();
        // if entry is successfully created, returning generated code along with the original one
        return res.status(201).json({ shortUrl: newUrl.shortUrl, original: url, message: "Short code generated successfully" });
        // if something goes wrong
    } catch (error) {
        // to log the error in the error file
        log(`URL: ${req.url} ${error}`, "error.txt");
        return res.status(500).json({ message: "Internal server error!" });
        

    }
    
}

// function to generate a unique short code
function generateUniqueCode() {
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Date.now().toString() + customAlphabet(str, 4)();
}


// to redirect to the original url form the short code
const fetchOriginalUrl = async (req, res) => {
    
    try {
        const { code } = req.params;
        // getting the original url form the database
        const url = await Url.findOne({ code });
        // if not found
        if (!url) return res.status(404).json({ message: "Invalid Code" });
        // if found, redirecting to the original url
        return res.status(200).json({original_url:url.original, message: "Original Url Fetched Successfully" });

    } catch (error) {
        // to log the error in the error file
        log(`URL: ${req.url} ${error}`, "error.txt");
        return res.status(500).json({ message: "Internal server error!" });


    }


}

// exporting controller actions
export default { shorten, fetchOriginalUrl };