import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
    getWishList,
    removeWishList,
    addToWishList,
} from "../controllers/wishListController.js";

const router = express.Router();

router.post("/:movieId", protect, addToWishList);

router.delete("/:movieId", protect, removeWishList);

router.get("/", protect, getWishList);

export default router;