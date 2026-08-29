import { StarIcon, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "@/context/WishlistContext";

export function MovieCard({ movie }) {
  const { isInWishlist } = useWishlist();

  const wishlisted = isInWishlist(movie._id);

  return (
    <div className="group rounded-2xl p-2 transition-all duration-300 hover:bg-white/5">
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

          {/* Wishlist indicator */}
          {wishlisted && (
            <div className="absolute left-3 top-3 rounded-full bg-black/70 p-2 backdrop-blur-sm">
              <Heart
                size={20}
                className="fill-red-500 text-red-500"
              />
            </div>
          )}

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
    </div>
  );
}