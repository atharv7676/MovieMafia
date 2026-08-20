import axios from "axios";

const tmdbApi = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add TMDB token when the request is actually made
tmdbApi.interceptors.request.use((config) => {
    config.headers.Authorization =
        `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`;

    return config;
});

export const searchMovies = async (query) => {
    const response = await tmdbApi.get("/search/movie", {
        params: {
            query,
        },
    });

    return response.data;
};

export const getMovieDetails = async (movieId) => {
    const response = await tmdbApi.get(`/movie/${movieId}`, {
        params: {
            append_to_response: "credits",
        },
    });

    return response.data;
};

export const getMovieWatchProviders = async (movieId) => {
    const response = await tmdbApi.get(
        `/movie/${movieId}/watch/providers`
    );

    return response.data;
};