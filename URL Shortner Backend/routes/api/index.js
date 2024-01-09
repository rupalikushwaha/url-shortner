//importing express
import express from "express";
const router = express.Router();

// importing v1 module
import v1 from "./v1/index.js";
router.use("/v1", v1);


//if the user hitting paths, other then  specified for routing
import {InvalidRequest} from "../../controllers/api/v1/invalid_request_controller.js";
router.use(InvalidRequest);

//exporting router
export default router;