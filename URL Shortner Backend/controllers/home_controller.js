import { log } from "../middlewares/logger_middleware.js";
const home=async(req,res)=>{
    try {
        return res.status(200).json({message: "Welcome to URL Shortner API" });

    } catch (error) {
        // to log the error in the error file
        log(`URL: ${req.url} ${error}`, "error.txt");
        return res.status(500).json({ message: "Internal server error!" });


    }
}
// exporting controller action
export {home};