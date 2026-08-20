import asyncHandler from "../middleware/asyncHandler.js";
import {
    searchMovies,
    getMovieDetails,
    getMovieWatchProviders
} from "../services/tmdb.service.js";

import mapTMDBMovie from "../utils/mapTMDBMovie.js";
import uploadTMDBPoster from "../services/tmdbPoster.service.js";

import Movie from "../models/movieModel.js";

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

    const poster = await uploadTMDBPoster(mappedMovie.posterUrl)

    mappedMovie.posterUrl = poster?.secure_url || mappedMovie.posterUrl;

    res.status(200).json({
        success: true,
        data: mappedMovie,
    });
});

const importTMDBMovie = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const existingMovie = await Movie.findOne({ tmdbId: Number(id) });

    if (existingMovie) {
        return res.status(409).json({
            success: false,
            message: "Movie already Imported",
        });
    }

    // Get movie details
    const movie = await getMovieDetails(id);

    // Map TMDB data to our Movie schema
    const mappedMovie = mapTMDBMovie(movie);

    // Get watch providers
    const providerData = await getMovieWatchProviders(id);
    const indiaProviders = providerData.results?.IN || {};

    const watchOptions = [
        ...(indiaProviders.flatrate || []).map((provider) => ({
            platform: provider.provider_name,
            url: indiaProviders.link,
            type: "subscription",
        })),

        ...(indiaProviders.rent || []).map((provider) => ({
            platform: provider.provider_name,
            url: indiaProviders.link,
            type: "rent",
        })),

        ...(indiaProviders.buy || []).map((provider) => ({
            platform: provider.provider_name,
            url: indiaProviders.link,
            type: "buy",
        })),

        ...(indiaProviders.free || []).map((provider) => ({
            platform: provider.provider_name,
            url: indiaProviders.link,
            type: "free",
        })),
    ];

    // Upload poster to Cloudinary
    const poster = await uploadTMDBPoster(mappedMovie.posterUrl);

    mappedMovie.poster = {
        url: poster.secure_url,
        public_id: poster.public_id,
    };

    delete mappedMovie.posterUrl;

    mappedMovie.tmdbId = Number(id);

    // Save watch options
    mappedMovie.watchOptions = watchOptions;

    // Save everything
    const savedMovies = await Movie.create(mappedMovie);

    res.status(201).json({
        message: "Movie saved SuccessFully",
        success: true,
        data: savedMovies,
    });
});

const getTMDBWatchProviders = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const data = await getMovieWatchProviders(id);
    const indiaProviders = data.results?.IN || {};

    const watchOptions = [
        ...(indiaProviders?.flatrate || []).map((provider) => ({
            platform: provider.provider_name,
            url: indiaProviders.link,
            type: "subscription",
        })),

        ...(indiaProviders?.rent || []).map((provider) => ({
            platform: provider.provider_name,
            url: indiaProviders.link,
            type: "rent",
        })),

        ...(indiaProviders?.buy || []).map((provider) => ({
            platform: provider.provider_name,
            url: indiaProviders.link,
            type: "buy",
        })),

        ...(indiaProviders?.free || []).map((provider) => ({
            platform: provider.provider_name,
            url: indiaProviders.link,
            type: "free",
        })),
    ];

    return res.status(201).json({
        success: true,
        data: watchOptions,

    })
}
)

const updateAllWatchOptions = asyncHandler(async (req, res) => {
    const movies = await Movie.find();

    let updated = 0;

    for (const movie of movies) {
        if (!movie.tmdbId) continue;

        const data = await getMovieWatchProviders(movie.tmdbId);
        const indiaProviders = data.results?.IN || {};

        const watchOptions = [
            ...(indiaProviders.flatrate || []).map((provider) => ({
                platform: provider.provider_name,
                url: indiaProviders.link,
                type: "subscription",
            })),

            ...(indiaProviders.rent || []).map((provider) => ({
                platform: provider.provider_name,
                url: indiaProviders.link,
                type: "rent",
            })),

            ...(indiaProviders.buy || []).map((provider) => ({
                platform: provider.provider_name,
                url: indiaProviders.link,
                type: "buy",
            })),

            ...(indiaProviders.free || []).map((provider) => ({
                platform: provider.provider_name,
                url: indiaProviders.link,
                type: "free",
            })),
        ];

        movie.watchOptions = watchOptions;
        await movie.save();

        updated++;
    }

    res.status(200).json({
        success: true,
        message: "Watch options updated",
        updated,
    });
});

export {
    searchTMDBMovies,
    getTMDBMovie,
    importTMDBMovie,
    getTMDBWatchProviders,
    updateAllWatchOptions
};