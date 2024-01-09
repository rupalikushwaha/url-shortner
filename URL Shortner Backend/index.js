// importing express
import express from "express";
const app = express();
const port = process.env.PORT || 6400;

//importing swagger
// import swagger from "swagger-ui-express";
// import swaggerDoc from "./swagger.json" assert{type:"json"};

import cors from "cors";

app.use(cors());

app.use(express.json());

//importing mongoose config
import db from "./config/mongoose.js";

//importing logger middleware
import {logger} from "./middlewares/logger_middleware.js"

//SETTING UP VIEW ENGINE
app.set("view engine", "ejs");
app.set("views", "./views");

//using decoder to read from POST requests
app.use(express.urlencoded({ extended: true }));

//using logger middleware
app.use(logger);

//for swagger documentation 
// app.use("/api-docs",swagger.serve,swagger.setup(swaggerDoc));

//routing all requests to routes
import router from "./routes/index.js"
app.use("/", router);


//listening to the server
app.listen(port, (error) => {
    if (error) {
        console.log("Error starting the server", error);
        return;
    }
    console.log(`Server listening on port: ${port}`);
});