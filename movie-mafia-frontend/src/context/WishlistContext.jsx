import { createContext, useContext, useState, useEffect } from "react";

import {
  addToWishList,
  removeFromWishlist,
  getWishList,
} from "@/services/wishlistServices";

const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await getWishList();
        setWishlist(response.wishList);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  const addMovie = async (movieId) => {
    const response = await addToWishList(movieId);

    setWishlist(response.wishList);
  };

  const removeMovie = async (movieId) => {
    const response = await removeFromWishlist(movieId);

    setWishlist(response.wishList);
  };

  const isInWishlist = (movieId) => {
    return wishlist.some(
      (movie) => movie._id.toString() === movieId.toString(),
    );
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addMovie, removeMovie, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

const useWishlist = () => useContext(WishlistContext);

export { WishlistProvider, useWishlist };
