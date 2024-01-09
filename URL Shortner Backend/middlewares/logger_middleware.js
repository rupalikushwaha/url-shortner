//importing promise form fs 
import { promises as fs } from 'fs';

//creating a function for logging
async function log(data,file) {
    try {
        //logging req and body using fs promises
        await fs.appendFile(file, `${new Date().toString()} Log: ${data} \n`);

    } catch (error) {
        return;
    }
}

//exporting logger middleware
async function logger(req, res, next) {

    //to avoid logging user credentials
    if (!req.url.includes("create")) {
        const data = `URL: ${req.url} BODY: ${JSON.stringify(req.body)}`;
        await log(data,"log.txt");
    }
    //calling the next middleware
    next();

}

export {log,logger};