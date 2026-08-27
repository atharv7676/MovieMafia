import { useWishlist } from "@/context/WishlistContext";
import { MovieCard } from "@/components/MovieCard/MovieCard";

function Wishlist() {
  const { wishlist } = useWishlist();
  return (
    <>
      <h1>Wishlist ({wishlist.length})</h1>
      {wishlist.length === 0 ? (
        <p className="text-white">No movies in your wishlist yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {wishlist.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}

export default Wishlist;
