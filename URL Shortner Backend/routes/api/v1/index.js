//importing express
import express from "express";
const router = express.Router();

//for users Api
import userApi from "./users.js";
router.use("/users", userApi);

// for urls Api
import urlsApi from "./urls.js";
router.use("/urls", urlsApi);


//if the user hitting paths, other then  specified for routing
import {InvalidRequest} from "../../../controllers/api/v1/invalid_request_controller.js";
router.use(InvalidRequest);

//exporting router
export default router;