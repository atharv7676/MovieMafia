import { registerUser, loginUser } from "../controllers/userController.js";
import express from "express"
import validate from "../middleware/validationMiddleware.js";
import { registerValidation } from "../validators/userValidator.js";

const router = express.Router()

router.post("/register",registerValidation,validate, registerUser);

router.post("/login",loginLimiter,loginUser);

export default router;