import { StarIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "@/context/WishlistContext";

export function MovieCard({ movie }) {
  const { addMovie, removeMovie, isInWishlist } = useWishlist();

  const wishlisted = isInWishlist(movie._id);

  const handleWishlist = async (e) => {
    e.preventDefault();

    try {
      if (wishlisted) {
        await removeMovie(movie._id);
      } else {
        await addMovie(movie._id);
      }
    } catch (error) {
      console.error("Wishlist action failed:", error);
    }
  };

  return (
    <div className="relative group block rounded-2xl p-2 transition-all duration-300 hover:bg-white/5">
      <Link to={`/movies/${movie._id}`}>
        <div className="relative">
          {/* Poster */}
          <div className=" aspect-2/3 overflow-hidden rounded-xl">
            <img
              src={movie.poster?.url}
              alt={movie.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Movie information */}
          <div className="mt-3 space-y-1">
            <p className="truncate text-base font-semibold text-white">
              {movie.title}
            </p>

            <p className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-black/70 px-2 py-1 text-sm text-yellow-400 backdrop-blur-sm">
              <StarIcon size={16} fill="currentColor" />
              {movie.rating}
            </p>

            <p className="truncate text-sm text-white/50">
              {movie.releaseYear} • {movie.genre?.join(" • ")}
            </p>
          </div>
        </div>
      </Link>

      <button
        type="button"
        onClick={handleWishlist}
        className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-black/80"
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <span
          className={`text-lg transition-transform duration-200 ${
            wishlisted ? "scale-110" : ""
          }`}
        >
          {wishlisted ? "♥" : "♡"}
        </span>
      </button>
    </div>
  );
}
