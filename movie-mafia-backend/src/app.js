import express from "express";
import movieRouter from "./routes/moviesRoute.js";
import userRouter from "./routes/userRoute.js";
import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import limiter from "./middleware/rateLimiter.js";
import tmdbRouter from "./routes/tmdbRoute.js";
import wishListRoute from "./routes/wishListRoute.js"

const app = express();

// app.use(limiter);
app.use(helmet())
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(morgan("combined"));
app.use(express.json());

app.use(cookieParser());

app.use("/movies", movieRouter);
app.use("/users", userRouter);
app.use("/tmdb", tmdbRouter);
app.use("/wishlist", wishListRoute);

app.use(errorHandler)
export default app;