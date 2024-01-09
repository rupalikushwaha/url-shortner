//importing router from express
import { Router } from "express";
const router=Router();

//importing authenticate token method from jwt middleware for authentication
import { authenticateToken } from "../../../middlewares/jwt_middleware.js";

//importing url controller
import urlApiController from "../../../controllers/api/v1/url_controller.js";

// to create new short code for url
router.post("/shorten",authenticateToken,urlApiController.shorten);

// to redirect to the original url form the given code
router.get("/:code",urlApiController.fetchOriginalUrl);

//if the user hitting paths, other then  specified endpoints
import {InvalidRequest} from "../../../controllers/api/v1/invalid_request_controller.js";
router.use(InvalidRequest);




export default router;