const mapTMDBMovie = (movie) => {

    const director =
        movie.credits?.crew?.find(
            (person) => person.job === "Director"
        )?.name || "";

    const cast =
        movie.credits?.cast
            ?.slice(0, 10)
            .map((person) => person.name) || [];

    const genres =
        movie.genres?.map((genre) => genre.name) || [];

    const releaseYear = movie.release_date
        ? Number(movie.release_date.slice(0, 4))
        : null;

    return {
        title: movie.title,
        description: movie.overview,
        releaseYear,
        genre: genres,
        duration: movie.runtime,
        director,
        rating: movie.vote_average,
        language: movie.original_language,
        cast,
    };
};

export default mapTMDBMovie;