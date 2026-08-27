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
    console.log("1. addMovie called:", movieId);

    try {
      console.log("2. calling wishlist API...");

      const response = await addToWishList(movieId);

      console.log("3. wishlist API response:", response);

      setWishlist(response.wishList);

      console.log("4. wishlist state updated");
    } catch (error) {
      console.error("5. wishlist API ERROR:", error);
    }
  };

  const removeMovie = async (movieId) => {
    const response = await removeFromWishlist(movieId);

    setWishlist(response.wishList || []);
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
