import dotenv from "dotenv";
import mongoose from "mongoose";
import Movie from "./src/models/movieModel.js";

dotenv.config();

const movies = [
    {
        title: "Inception",
        description:
            "A skilled thief who steals secrets through dream-sharing technology is given a chance to erase his past by planting an idea in someone's mind.",
        releaseYear: 2010,
        genre: ["Action", "Sci-Fi", "Thriller"],
        duration: 148,
        director: "Christopher Nolan",
        rating: 8.8,
        language: "English",
        posterUrl:
            "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
        cast: [
            "Leonardo DiCaprio",
            "Joseph Gordon-Levitt",
            "Elliot Page",
            "Tom Hardy"
        ],
        watchOptions: [
            {
                platform: "Amazon Prime Video",
                type: "subscription",
                url: "https://www.primevideo.com/"
            }
        ]
    },

    {
        title: "Interstellar",
        description:
            "A group of explorers travels through a wormhole in space in search of a new home for humanity as Earth faces an uncertain future.",
        releaseYear: 2014,
        genre: ["Adventure", "Drama", "Sci-Fi"],
        duration: 169,
        director: "Christopher Nolan",
        rating: 8.7,
        language: "English",
        posterUrl:
            "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        cast: [
            "Matthew McConaughey",
            "Anne Hathaway",
            "Jessica Chastain",
            "Michael Caine"
        ],
        watchOptions: []
    }
];

const seedMovies = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing in .env");
        }

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        let added = 0;
        let skipped = 0;

        for (const movie of movies) {
            const existingMovie = await Movie.findOne({
                title: movie.title,
                releaseYear: movie.releaseYear
            });

            if (existingMovie) {
                console.log(`⏭️ Skipped: ${movie.title}`);
                skipped++;
                continue;
            }

            await Movie.create(movie);

            console.log(`✅ Added: ${movie.title}`);
            added++;
        }

        console.log("\n----------------------------");
        console.log("Movie seeding completed");
        console.log(`Added: ${added}`);
        console.log(`Skipped: ${skipped}`);
        console.log("----------------------------");
    } catch (error) {
        console.error("❌ Seeding failed:");
        console.error(error.message);
    } finally {
        await mongoose.disconnect();
        console.log("MongoDB disconnected");
    }
};

seedMovies();