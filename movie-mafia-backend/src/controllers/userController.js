import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import Movie from "../models/movieModel.js";

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, id, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        // Create user
        const createdUser = await User.create({
            name,
            email,
            password
        });

        // Success response
        return res.status(201).json({
            message: "User registered successfully",
            data: createdUser,
        });

    } catch (error) {
        console.log("REGISTER ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findByEmail(email)

        if (!user) {
            return res.status(404).json({
                message: "Invalid email or password",
            });
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid Credentials "
            })
            logger.warn(`Failed login attempt for ${email}`);
        }
        // generating Access Token
        const accessToken = user.generateAccessToken();

        //Generating Refresh Token
        const refreshToken = user.generateRefreshToken();

        // saving Refesh Token for future Use
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        // securing the cookies 
        const options = {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
        };

        //Sending Cookie Request

        res.cookie(
            "accessToken",
            accessToken,
            options
        );

        res.cookie("refreshToken", refreshToken, options);

        // Sucessfully Login 
        return res.status(200).json({
            message: "Login succesfull",
            accessToken
        })

        logger.info(`User ${user.email} logged in successfully`);

    } catch (error) {
        next(error)
    }

}

const logoutUser = async (req, res, next) => {
    try {
        req.user.refreshToken = "";
        await req.user.save({ validateBeforeSave: false });

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
        };

        res.clearCookie("accessToken", options);

        res.clearCookie("refreshToken", options);

        return res.status(200).json({
            message: "Logout successful",
        });
    } catch (error) {
        next(error)
    }
}

const refreshAccessToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                message: "Unautorised Access",
                success: false,
            })
        }
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(401).json({
                message: "User not found",
                success: false,
            });
        }

        if (refreshToken !== user.refreshToken) {
            return res.status(401).json({
                message: "Unautorised Access",
                success: false,
            })
        }

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",

        }
        const accessToken = user.generateAccessToken();

        // Generate New Refresh Token (Rotation)
        const newRefreshToken = user.generateRefreshToken();

        // Replace old Refresh Token in Database
        user.refreshToken = newRefreshToken;

        // Save without running validations
        await user.save({ validateBeforeSave: false });

        res.cookie(
            "accessToken",
            accessToken,
            options
        );

        // Send New Refresh Token to Browser
        res.cookie(
            "refreshToken",
            newRefreshToken,
            options
        );

        return res.status(200).json({
            message:
                "Access Token Refreshed",
            accessToken
        });
    } catch (error) {
        next(error)
    }

}

const getCurrentUser = async (req, res, next) => {
    try {

        return res.status(200).json({
            success: true,
            user: req.user,
        });

    } catch (error) {
        next(error);
    }
};


const getAdminStats = async (req, res, next) => {
  try {
    const totalMovies = await Movie.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalWishlistItems = await User.aggregate([
      {
        $project: {
          wishlistCount: { $size: { $ifNull: ["$wishList", []] } },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$wishlistCount" },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: {
        totalMovies,
        totalUsers,
        totalWishlistItems: totalWishlistItems[0]?.total || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  getAdminStats,
};