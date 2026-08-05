import express from "express";
import { createMovie, deleteMovie, getAllMovies, getMovie, updateMovie } from "../controllers/movie.controller.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorize.js";
import upload from "../config/multer.js";

const router = express.Router();

router.get("/", getAllMovies);
router.get("/:id", getMovie);
 
router.post(
    "/",
    protect,
    authorize,
    upload.single("poster"),
    createMovie
);


router.put(
    "/movies/:id",
    protect,
    authorize("admin", "moderator"),
    updateMovie
);


router.delete(
    "/movies/:id",
    protect,
    authorize("admin"),
    deleteMovie
);


export default router
