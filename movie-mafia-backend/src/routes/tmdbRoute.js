import express from "express";

import {
    searchTMDBMovies,
    getTMDBMovie,
    importTMDBMovie,
    getTMDBWatchProviders,
    updateAllWatchOptions
} from "../controllers/tmdb.controller.js";


const router = express.Router();

router.get("/search", searchTMDBMovies);
router.get("/movie/:id", getTMDBMovie);
router.post("/movie/:id/import", importTMDBMovie);
router.get("/movie/:id/watch", getTMDBWatchProviders);
router.post("/update-watch-options", updateAllWatchOptions);

export default router;