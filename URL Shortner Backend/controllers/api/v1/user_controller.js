//importing user model
import User from "../../../models/User.js";
//importing validator
import validator from "validator";
//importing jwt
import jwt from "jsonwebtoken";
//importing bcrypt
import bcrypt from "bcrypt";

// importing path and filesystem
import Path from "path";
import fileSystem from "fs";

// importing logger middleware function
import { log } from "../../../middlewares/logger_middleware.js";
// importing Url model
import Url from "../../../models/Url.js";

const salt = 10;

const jwtSecret = process.env.JWT_SECRET || "secretkey";




//to create a new user
const create = async (req, res) => {

    try {
        const { name, email, password, confirm_password } = req.body;
        // if password length is less then 5   
        if (password.length < 5)
        return res.status(401).json({ message: "Passwords must be 5 characters or more" });
    
    //if passwords does not match
        if (password !== confirm_password)
            return res.status(401).json({ message: "Passwords does not match" });

        //if email is invalid
        if (!validator.isEmail(email))
            return res.status(401).json({ message: "Provide a valid email" });

        const user = await User.findOne({ email: email });
        //is user already present
        if (user) return res.status(409).json({ message: "User already exists!" });

        //creating new user
        const encryptedPass = await bcrypt.hash(password, salt);
        const newUser = await User.create({ name, email, password: encryptedPass });
        //if user created successfully
        if (newUser) return res.status(201).json({ id:newUser.id,email:newUser.email,message: "User created successfully", });

        return res.status(400).json({ message: "Unable to signup!" });

        // if something else goes wrong
    } catch (error) {
        log(`URL: ${req.url} ${error}`, "error.txt");
        return res.status(500).json({ message: "Internal Server Error" });
    }

}

// to generate the token, against the user
const createSession = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        //if the email or password does not match
        if (!user) return res.status(401).json({ message: "Invalid Email/Password" });
        
        // to authenticate the user identity
        const isAuthentic = await bcrypt.compare(String(password), user.password);
        if (!isAuthentic) return res.status(401).json({ message: "Invalid Email/Password" });

        return res.status(200).json({
            message: "Login successful",
            token: jwt.sign(user.toJSON(), jwtSecret, { expiresIn: 1000000 }),
            name: user.name
        });

        // if something else goes wrong
    } catch (error) {
        log(`URL: ${req.url} ${error}`, "error.txt");
        return res.status(500).json({ message: "Internal server error" });
    }

};


//to update the user details
const update = async (req, res) => {
    try {
        const { name, email, password, new_password, confirm_password } = req.body;
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // to authenticate the user before updating
        const isAuthentic = await bcrypt.compare(password, user.password);
        if (!isAuthentic) return res.status(401).json({ message: "Incorrect old Password" });


        if (!new_password || !confirm_password) return res.status(400).json({ message: "please provide a valid new password" });
        if (new_password != confirm_password) return res.status(400).json({ message: "Password mismatch!" });
        //updating user's password
        if (new_password) {
            const encryptedPass = await bcrypt.hash(new_password, salt);
            await user.updateOne({ password: encryptedPass });
        }
        //updating other details
        await user.updateOne({ name, email });
        await user.save();
        return res.status(202).json({ message: "User details updated successfully" });


    } catch (error) {
        log(`URL: ${req.url} ${error}`, "error.txt");
        return res.status(500).json({ message: "Internal server error" });

    }
}



//to delete a user
const destroy = async (req, res) => {
    try {
        if (!req.body.password) return res.status(401).json({ message: "Unauthorized! Provide password to establish identity" });

        const user = await User.findById(req.user._id);
        //if user not found
        if (!user) return res.status(404).json({ message: "User not found!" });

        //to authenticate the user before deleting
        const isAuthentic = await bcrypt.compare(String(req.body.password), user.password);
        if (!isAuthentic) return res.status(401).json({ message: "Unauthorized!" });

        // deleting songs associated to that user
        for (let url of user.urls) deleteUrl(url);

        const token = jwt.sign(user.toJSON(), jwtSecret, { expiresIn: 1 });
        await user.deleteOne();
        return res.status(204).json({ message: "User deleted Successfully", user: { name: user.name, email: user.email }, token });

    } catch (error) {
        log(`URL: ${req.url} ${error}`, "error.txt");
        return res.status(500).json({ message: "Internal server error" });
    }
}

//function to delete all the urls uploaded by the user
async function deleteUrl(url) {
    try {
        await Url.findByIdAndDelete(url);
        return true;
    } catch (e) {
        return false;
    }
}




// exporting controllers
export default { create, createSession, update, destroy };

