import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";

import {
  addToWishList,
  removeFromWishlist,
  getWishList,
} from "@/services/wishlistServices";

const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const hasLocalChangeRef = useRef(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    let ignore = false;

    const fetchWishlist = async () => {
      try {
        const response = await getWishList();

        // Don't clobber a change the user already made while this was loading
        if (!ignore && !hasLocalChangeRef.current) {
          setWishlist(response.wishList || []);
        }
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    };

    fetchWishlist();

    return () => {
      ignore = true;
    };
  }, []);

  const addMovie = async (movieId) => {
    if (!isAuthenticated) {
      return { success: false, requiresLogin: true };
    }

    setWishlistLoading(true);

    try {
      const response = await addToWishList(movieId);

      setWishlist(response.wishList || []);

      return { success: true, requiresLogin: false };
    } catch (error) {
      console.error("Failed to add movie to wishlist:", error);
      return { success: false, requiresLogin: false };
    } finally {
      setWishlistLoading(false);
    }
  };

  const removeMovie = async (movieId) => {
    if (!isAuthenticated) {
      return { success: false, requiresLogin: true };
    }

    setWishlistLoading(true);

    try {
      const response = await removeFromWishlist(movieId);

      setWishlist(response.wishList || []);

      return { success: true, requiresLogin: false };
    } catch (error) {
      console.error("Failed to remove movie from wishlist:", error);
      return { success: false, requiresLogin: false };
    } finally {
      setWishlistLoading(false);
    }
  };

  const isInWishlist = (movieId) => {
    return wishlist.some(
      (movie) => (movie._id || movie).toString() === movieId.toString(),
    );
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addMovie, removeMovie, isInWishlist, wishlistLoading }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

const useWishlist = () => useContext(WishlistContext);

export { WishlistProvider, useWishlist };
