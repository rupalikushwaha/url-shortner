//importing express
import express from "express";
const router = express.Router();

// impoeting resirect controller
import { redirect } from "../controllers/url_redirect_controller.js";

import api from "./api/index.js";
router.use("/api", api);



router.get("/:code",redirect);

// importing home controller
import { home } from "../controllers/home_controller.js";
router.get("/",home);
//if the user hitting paths, other then  specified for routing
import {InvalidRequest} from "../controllers/api/v1/invalid_request_controller.js";
router.use(InvalidRequest);


//exporting router
export default router;