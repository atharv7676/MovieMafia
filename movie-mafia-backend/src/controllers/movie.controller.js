import asyncHandler from "../middleware/asyncHandler.js";
import Movie from "../models/movieModel.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";
import ApiError from "../utils/ApiError.js";
import cloudinary from "../config/cloudinary.js";

const createMovie = asyncHandler(async (req, res) => {

    if (!req.file) {
        throw new ApiError(400, "Movie poster is required");
    }
    const result = await uploadOnCloudinary(req.file.path);

    if (!result) {
        throw new ApiError(500, "Image upload failed");
    }

    // Convert watchOptions from form-data string → array
    if (req.body.watchOptions) {
        try {
            req.body.watchOptions = JSON.parse(req.body.watchOptions);
        } catch (error) {
            throw new ApiError(400, "Invalid watchOptions format");
        }
    }

    const movie = await Movie.create({
        ...req.body,

        poster: {
            url: result.secure_url,
            public_id: result.public_id,
        },
    });

    res.status(201).json({
        message: "Movie created successfully",
        data: movie,
    });
});

const getMovie = asyncHandler(async (req, res) => {

    const movie = await Movie.findById(req.params.id)
    if (!movie) {
        throw new ApiError(404, "Movie not found");
    }
    res.status(200).json({
        message: "Movie Fetched Succesfully",
        data: movie
    })
})

const getAllMovies = asyncHandler(async (req, res) => {
    // req.query is wrote because what if i want to find movies according to genere 

    // this is written cause the sort and filteratin should be separeted and with this we eill add of pagination later which is limit, page
    const { search, sort, page, limit, ...filters } = req.query;

    if (search) {
        filters.title = {
            $regex: search,
            $options: "i",
        };
    }
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;

    const totalMovies = await Movie.countDocuments(filters);

    const totalPages = Math.ceil(totalMovies / limitNumber);

    const movies = await Movie.find(filters).sort(sort).skip((pageNumber - 1) * limitNumber).limit(limitNumber)

    if (movies.length === 0) {
        throw new ApiError(404, "Movie not found");
    }

    res.status(200).json({
        success: true,
        message: "Got all the Movies",
        cureentPage: pageNumber,
        totalPages,
        totalMovies,
        data: movies
    })
})


const deleteMovie = asyncHandler(async (req, res) => {

    const movie = await Movie.findById(req.params.id);

    if (!movie) {

        return res.status(404).json({
            message: "Movie not found",
        });

    }

    await cloudinary.uploader.destroy(
        movie.poster.public_id
    );

    await movie.deleteOne();

    return res.status(200).json({
        message: "Movie Deleted Successfully",
    });

    logger.warn(`Movie ${movie.title} deleted`);

})


const updateMovie = asyncHandler(async (req, res) => {

    const movie = await Movie.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );
    if (!movie) {
        throw new ApiError(404, "Movie not found");
    }

    if (req.file) {

        //delete old image

        await cloudinary.uploader.destroy(
            movie.poster.public_id
        );

        //upload New Image

        const result = await uploadOnCloudinary(req.file.path);

        //save New Image
        movie.poster = {
            url: result.secure_url,
            public_id: result.public_id,
        }
    }

    //update Other Fields 

    Object.assign(movie, req.body);
    await movie.save();

    res.status(200).json({
        message: "Updated the Movie Succesfully",
        data: movie
    })
})

export { createMovie, getMovie, getAllMovies, deleteMovie, updateMovie }