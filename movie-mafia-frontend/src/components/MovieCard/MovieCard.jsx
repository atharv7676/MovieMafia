import { StarIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "@/context/WishlistContext";

export function MovieCard({ movie }) {
  const { addMovie, removeMovie, isInWishlist } = useWishlist();

  const wishlisted = isInWishlist(movie._id);

  const handleWishlist = async () => {
    console.log("1. Wishlist button clicked:", movie._id);

    try {
      if (wishlisted) {
        console.log("2. Removing from wishlist...");
        await removeMovie(movie._id);
      } else {
        console.log("2. Adding to wishlist...");
        await addMovie(movie._id);
      }
    } catch (error) {
      console.error("3. Wishlist action failed:", error);
    }
  };

  return (
    <div className="group rounded-2xl p-2 transition-all duration-300 hover:bg-white/5">
      {/* Movie Card */}
      <Link to={`/movies/${movie._id}`} className="block">
        <div className="relative">
          {/* Poster */}
          <div className="aspect-2/3 overflow-hidden rounded-xl">
            <img
              src={movie.poster?.url}
              alt={movie.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Rating */}
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-black/70 px-2 py-1 text-sm text-yellow-400 backdrop-blur-sm">
            <StarIcon size={16} fill="currentColor" />
            {movie.rating}
          </div>

          {/* Movie information */}
          <div className="mt-3 space-y-1">
            <p className="truncate text-base font-semibold text-white">
              {movie.title}
            </p>

            <p className="truncate text-sm text-white/50">
              {movie.releaseYear} • {movie.genre?.join(" • ")}
            </p>
          </div>
        </div>
      </Link>

      {/* Wishlist */}
      <button
        type="button"
        onClick={handleWishlist}
        className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
      >
        {wishlisted ? "♥ Remove from Wishlist" : "♡ Add to Wishlist"}
      </button>
    </div>
  );
}
