import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ArrowLeft, Clock3, CalendarDays, Star } from "lucide-react";
import { getMovieById } from "../../services/movieService";
import { useWishlist } from "@/context/WishlistContext";
import toast from "react-hot-toast";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlistUpdating, setWishlistUpdating] = useState(false);

  const { isInWishlist, addMovie, removeMovie, wishlistLoading } =
    useWishlist();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieById(id);
        setMovie(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleWishlist = async () => {
    
    if (wishlistUpdating) return;

    setWishlistUpdating(true);

    try {
      let result;

      if (isInWishlist(movie._id)) {
        result = await removeMovie(movie._id);
      } else {
        result = await addMovie(movie._id);
      }

      if (result?.requiresLogin) {
        toast.error("Please login first", {
          description:
            "You need to be logged in to add movies to your wishlist.",
        });

        return;
      }

      if (!result?.success) {
        toast.error("Something went wrong", {
          description: "Please try again.",
        });
      }
    } finally {
      setWishlistUpdating(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center text-white">
        <p className="text-white/60">Loading movie...</p>
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="flex min-h-screen items-center justify-center text-white">
        <p className="text-white/60">Movie not found.</p>
      </main>
    );
  }

  const inWishlist = isInWishlist(movie._id);

  return (
    <main className="min-h-screen px-4 pb-20 pt-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Back */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Movies
        </Link>

        {/* Main */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/4 shadow-2xl backdrop-blur-xl">
          <div className="grid gap-8 p-5 sm:p-8 md:grid-cols-[260px_1fr] lg:gap-12 lg:p-10">
            {/* Poster */}
            <div className="mx-auto w-full max-w-65">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={movie.poster?.url}
                  alt={movie.title}
                  className="aspect-2/3 w-full object-cover"
                />
              </div>

              {/* Wishlist */}
              <button
                type="button"
                onClick={handleWishlist}
                disabled={wishlistLoading}
                className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  inWishlist
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-white/10 text-white hover:bg-white/15"
                }`}
              >
                <Heart size={18} className={inWishlist ? "fill-white" : ""} />

                {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>

            {/* Information */}
            <div className="flex min-w-0 flex-col justify-center">
              {/* Title */}
              <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {movie.title}
              </h1>

              {/* Metadata */}
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/60">
                <span className="flex items-center gap-1.5 text-yellow-400">
                  <Star size={16} className="fill-yellow-400" />
                  {movie.rating?.toFixed(1)}
                </span>

                <span className="flex items-center gap-1.5">
                  <CalendarDays size={15} />
                  {movie.releaseYear}
                </span>

                <span className="flex items-center gap-1.5">
                  <Clock3 size={15} />
                  {movie.duration} min
                </span>

                <span>{movie.language}</span>
              </div>

              {/* Genres */}
              <div className="mt-6 flex flex-wrap gap-2">
                {movie.genre?.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="mt-7 max-w-3xl text-sm leading-7 text-white/65 sm:text-base">
                {movie.description}
              </p>

              {/* Director */}
              <div className="mt-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/35">
                  Director
                </p>

                <p className="mt-2 font-semibold text-white">
                  {movie.director}
                </p>
              </div>

              {/* Cast */}
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/35">
                  Cast
                </p>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-white/65">
                  {movie.cast?.join(" • ")}
                </p>
              </div>

              {/* Watch */}
              <div className="mt-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/35">
                  Where to Watch
                </p>

                <div className="flex flex-wrap gap-3">
                  {movie.watchOptions?.length > 0 ? (
                    movie.watchOptions.map((option, index) => (
                      <a
                        key={`${option.platform}-${index}`}
                        href={option.url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:scale-105 hover:bg-white/90"
                      >
                        ▶ {option.platform}
                      </a>
                    ))
                  ) : (
                    <p className="text-sm text-white/40">
                      No streaming options available in India.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MovieDetails;
