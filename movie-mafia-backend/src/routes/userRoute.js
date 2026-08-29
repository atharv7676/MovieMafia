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
import limiter from "../middleware/rateLimiter.js";
import { getAdminStats } from "../controllers/userController.js";

const router = express.Router()

router.post(
    "/register",
    registerValidation,
    validate,
    registerUser
);

router.post(
    "/login",
    limiter,
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


router.get(
    "/admin/stats",
    protect,
    getAdminStats
);

export default router;