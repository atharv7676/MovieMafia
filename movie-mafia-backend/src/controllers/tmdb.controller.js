import asyncHandler from "../middleware/asyncHandler.js";
import {
    searchMovies,
    getMovieDetails,
} from "../services/tmdb.service.js";
import mapTMDBMovie from "../utils/mapTMDBMovie.js";

const searchTMDBMovies = asyncHandler(async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({
            success: false,
            message: "Movie search query is required",
        });
    }

    const data = await searchMovies(query);

    res.status(200).json({
        success: true,
        data: data.results,
    });
});


const getTMDBMovie = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Movie ID is required",
        });
    }

    const movie = await getMovieDetails(id);
    const mappedMovie = mapTMDBMovie(movie);

    res.status(200).json({
        success: true,
        data: mappedMovie,
    });
});

export { searchTMDBMovies, getTMDBMovie };