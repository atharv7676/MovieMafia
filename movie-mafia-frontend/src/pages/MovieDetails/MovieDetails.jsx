import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../services/movieService";
import { Link } from "react-router-dom";

function MovieDetails() {
  console.log("MOVIE DETAILS MOUNTED");
  const { id } = useParams();
  console.log("MOVIE ID:", id);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieById(id);
        console.log("MOVIE API RESPONSE:", response);
        setMovie(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!movie) {
    return <p>Movie not found</p>;
  }

  return (
    <main className="min-h-screen px-4 pb-16 pt-2 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Back button */}
        <Link
          to="/"
          className="relative z-[100] mb-4 inline-block cursor-pointer rounded-lg bg-red-500 px-4 py-3 text-white"
        >
          ← Go Home
        </Link>

        {/* Main movie card */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/3 shadow-2xl backdrop-blur-xl">
          <div className="grid gap-8 p-5 sm:p-8 md:grid-cols-[280px_1fr] lg:gap-12 lg:p-10">
            {/* Poster */}
            <div className="mx-auto w-full max-w-[280px]">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={movie.poster?.url}
                  alt={movie.title}
                  className="aspect-[2/3] w-full object-cover"
                />
              </div>
            </div>

            {/* Movie information */}
            <div className="flex flex-col justify-center">
              {/* Title */}
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                {movie.title}
              </h1>

              {/* Metadata */}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/60">
                <span className="flex items-center gap-1 text-yellow-400">
                  ⭐ {movie.rating?.toFixed(1)}
                </span>

                <span>•</span>

                <span>{movie.releaseYear}</span>

                <span>•</span>

                <span>{movie.duration} min</span>

                <span>•</span>

                <span>{movie.language?.toUpperCase()}</span>
              </div>

              {/* Genres */}
              <div className="mt-5 flex flex-wrap gap-2">
                {movie.genre?.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="mt-6 max-w-3xl text-sm leading-7 text-white/60 sm:text-base">
                {movie.description}
              </p>

              {/* Director */}
              <div className="mt-6">
                <p className="text-xs uppercase tracking-wider text-white/40">
                  Director
                </p>

                <p className="mt-1 font-semibold text-white">
                  {movie.director}
                </p>
              </div>

              {/* Cast */}
              <div className="mt-5">
                <p className="text-xs uppercase tracking-wider text-white/40">
                  Cast
                </p>

                <p className="mt-1 text-sm leading-6 text-white/70">
                  {movie.cast?.join(" • ")}
                </p>
              </div>

              {/* Watch options */}
              <div className="mt-7 flex flex-wrap gap-3">
                {movie.watchOptions?.map((option, index) => (
                  <a
                    key={`${option.platform}-${index}`}
                    href={option.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:scale-105"
                  >
                    ▶ {option.platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MovieDetails;
