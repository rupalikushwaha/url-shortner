//importing Url model
import Url from "../models/Url.js";
import Analytic from "../models/Analytic.js";

// importing log middleware to log the error
import { log } from "../middlewares/logger_middleware.js";

const redirect = async (req, res) => {
    try {
        const { code } = req.params;
        // getting the original url form the database
        const url = await Url.findOne({ code });
        // if not found
        if (!url) return res.render("error", { content: "Invalid Code" });

        // to store the analytics in the database
        const { ip, headers } = req;
        const { 'user-agent': userAgent } = headers;

        // Save user details to the Analytic collection
        const analyticData = await Analytic.create({
            urlId: url._id,
            ipAddress: ip,
            userAgent: userAgent,
            timestamp: new Date(),
        });

        // if found, redirecting to the original url
        return res.redirect(url.original);
    } catch (error) {
        // to log the error in the error file
        log(`URL: ${req.url} ${error}`, "error.txt");
        return res.render("error", { content: "Internal server error" });


    }
}
export { redirect };