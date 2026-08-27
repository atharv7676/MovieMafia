import User from "../models/userModel.js";
import Movie from "../models/movieModel.js";

export const addToWishList = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not Found",
        success: false,
      });
    }

    const user = req.user;

    if (user.wishList.includes(movieId)) {
      return res.status(409).json({
        success: false,
        message: "Movie already exists",
      });
    }

    user.wishList.push(movieId);

    await user.save();

    const populatedUser = await User.findById(user._id).populate("wishList");

    return res.status(200).json({
      success: true,
      message: "Movie added to wishList successfully",
      wishList: populatedUser.wishList,
    });
  } catch (error) {
    next(error);
  }
};

export const removeWishList = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    const user = req.user;

    const movieExistsInWishlist = user.wishList.some(
      (id) => id.toString() === movieId
    );

    if (!movieExistsInWishlist) {
      return res.status(404).json({
        success: false,
        message: "Movie not found in wishlist",
      });
    }

    user.wishList = user.wishList.filter(
      (id) => id.toString() !== movieId
    );

    await user.save();

    const populatedUser = await User.findById(user._id).populate("wishList");

    return res.status(200).json({
      success: true,
      message: "Movie removed from wishlist successfully",
      wishList: populatedUser.wishList,
    });
  } catch (error) {
    next(error);
  }
};

export const getWishList = async (req, res, next) => {
  try {
    const user = req.user;

    const populatedUser = await User.findById(user._id).populate("wishList");

    return res.status(200).json({
      success: true,
      message: "Wishlist fetched successfully",
      wishList: populatedUser.wishList,
    });
  } catch (error) {
    next(error);
  }
};