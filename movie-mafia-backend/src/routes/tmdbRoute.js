import express from "express";

import {
    searchTMDBMovies,
    getTMDBMovie,
} from "../controllers/tmdb.controller.js";

const router = express.Router();

router.get("/search", searchTMDBMovies);
router.get("/movie/:id", getTMDBMovie);

export default router;