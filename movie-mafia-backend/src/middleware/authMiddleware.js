import jwt from "jsonwebtoken"
import User from "../models/userModel.js";

const protect = async (req, res, next) => {

    const token = req.cookies?.accessToken;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorised"
        })
    }

    try {

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        
        const user = await User.findById(decoded._id).select("-password -refreshToken");

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        req.user = user;
        next()

    } catch (error) {
        return res.status(401).json({
            message: "Session is expired please relogin"
        })
    }

}

export default protect