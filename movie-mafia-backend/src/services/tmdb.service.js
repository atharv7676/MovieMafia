import axios from "axios";

const tmdbApi = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
    },
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


