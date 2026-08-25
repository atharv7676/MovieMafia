import { StarIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function MovieCard({ movie }) {
  return (
    <Link
      to={`/movies/${movie._id}`}
      className="group block rounded-2xl p-2 transition-all duration-300 hover:bg-white/5"
    >
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
  );
}
