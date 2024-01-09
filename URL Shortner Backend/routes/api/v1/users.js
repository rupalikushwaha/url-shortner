//importing router from express
import {Router} from "express";
const router = Router();

//importing authenticate token method from jwt middleware for authentication
import { authenticateToken } from "../../../middlewares/jwt_middleware.js";

//importing user controller
import userApiController from "../../../controllers/api/v1/user_controller.js";

//to create user
router.post("/create", userApiController.create);

//to create session
router.post("/create-session", userApiController.createSession);

// //to delete a user
router.delete("/destroy", authenticateToken, userApiController.destroy);

// //to update user details
router.patch("/update/:id", authenticateToken, userApiController.update);

//if the user hitting paths, other then  specified endpoints
import {InvalidRequest} from "../../../controllers/api/v1/invalid_request_controller.js";
router.use(InvalidRequest);


//exporting router
export default router;