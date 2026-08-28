import { useWishlist } from "@/context/WishlistContext";
import { MovieCard } from "@/components/MovieCard/MovieCard";
import { Heart } from "lucide-react";

function Wishlist() {
  const { wishlist } = useWishlist();
  return (
    <div className="min-h-screen  px-4 pb-12 pt-28 sm:px-6 rounded-3xl border border-white/10 bg-black/20 p-6 shadow-2xl backdrop-blur-none">
      <div className="flex justify-center text-center text-3xl font-bold text-white">
        <h1 className="flex items-center gap-2">
          Wishlist
          <Heart size={24} className="text-red-500 fill-red-500" />
        </h1>
      </div>
      {wishlist.length === 0 ? (
        <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
          <Heart size={56} className="mb-4 text-red-500/40" />

          <h2 className="text-2xl font-bold text-white">
            Your wishlist is empty
          </h2>

          <p className="mt-2 max-w-md text-sm text-white/50">
            Save movies you want to watch later and they’ll show up here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {wishlist.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
