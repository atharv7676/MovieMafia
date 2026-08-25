import React from "react";
import { MovieCard } from "../MovieCard/MovieCard";

function MovieSection({ title, movies }) {
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-2xl font-bold text-white">{title}</h2>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default MovieSection;
