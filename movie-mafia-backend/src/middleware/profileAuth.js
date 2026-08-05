import express from "express";

const auth = express.Router();

auth.use("/", (req, res, next) => {

    try {
        const token = req.headers.authorization;

        return res.status(201).json({
            message: "Access Granted"
        })
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    const jwtToken = token.split("")[1];

    const decoded = jwt.verify(
        jwtToken, 
        process.env.JWT_SECRET,
    )

    req.user = decoded;

    next();

})

export default auth
