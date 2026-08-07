import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser
} from "../controllers/userController.js";
import express from "express"
import validate from "../middleware/validationMiddleware.js";
import { registerValidation } from "../validators/userValidator.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router()

router.post(
    "/register",
    registerValidation,
    validate,
    registerUser
);

router.post(
    "/login",
    loginLimiter,
    loginUser
);

router.post(
    "/logout",
    protect,
    logoutUser
);

router.post(
    "/refresh-token",
    refreshAccessToken
);

router.get(
    "/me",
    protect,
    getCurrentUser
);

export default router;