import dotenv from "dotenv";
import mongoose from "mongoose";
import Movie from "./src/models/movieModel.js";

dotenv.config();

// Movie Mafia — seed data
// NOTE: posterUrl left as "" where the exact TMDB poster path could not be
// verified live. Recommend populating these via a TMDB API lookup by title/year
// at seed time (GET /search/movie) rather than trusting hardcoded hashes.

const movies = [
    {
        title: "Inception",
        description:
            "A skilled thief who extracts secrets from people's subconscious is offered a chance at redemption if he can pull off the impossible: planting an idea deep within a target's mind.",
        releaseYear: 2010,
        genre: ["Action", "Sci-Fi", "Thriller"],
        duration: 148,
        director: "Christopher Nolan",
        rating: 8.8,
        language: "English",
        posterUrl: "",
        cast: [
            "Leonardo DiCaprio",
            "Joseph Gordon-Levitt",
            "Tom Hardy",
            "Elliot Page",
            "Ken Watanabe",
            "Marion Cotillard"
        ],
        watchOptions: [
            { platform: "Amazon Prime Video", type: "subscription", url: "https://www.primevideo.com/" },
            { platform: "JioHotstar", type: "subscription", url: "https://www.jiohotstar.com/" },
            { platform: "Apple TV", type: "rent", url: "https://tv.apple.com/" }
        ]
    },
    {
        title: "The Dark Knight",
        description:
            "As a criminal mastermind known as the Joker unleashes chaos on Gotham, Batman must confront the fine line between heroism and vigilantism alongside Lieutenant Gordon and DA Harvey Dent.",
        releaseYear: 2008,
        genre: ["Action", "Crime", "Drama", "Thriller"],
        duration: 152,
        director: "Christopher Nolan",
        rating: 8.5,
        language: "English",
        posterUrl: "",
        cast: [
            "Christian Bale",
            "Heath Ledger",
            "Aaron Eckhart",
            "Michael Caine",
            "Gary Oldman",
            "Morgan Freeman"
        ],
        watchOptions: [
            { platform: "Amazon Prime Video", type: "subscription", url: "https://www.primevideo.com/" },
            { platform: "JioHotstar", type: "subscription", url: "https://www.jiohotstar.com/" }
        ]
    },
    {
        title: "Interstellar",
        description:
            "With Earth becoming uninhabitable, a former pilot leads a team through a wormhole in search of a new home for humanity, risking everything to secure a future for his family and mankind.",
        releaseYear: 2014,
        genre: ["Sci-Fi", "Adventure", "Drama"],
        duration: 169,
        director: "Christopher Nolan",
        rating: 8.4,
        language: "English",
        posterUrl: "",
        cast: [
            "Matthew McConaughey",
            "Anne Hathaway",
            "Jessica Chastain",
            "Michael Caine",
            "Matt Damon"
        ],
        watchOptions: [
            { platform: "Amazon Prime Video", type: "subscription", url: "https://www.primevideo.com/" },
            { platform: "JioHotstar", type: "subscription", url: "https://www.jiohotstar.com/" },
            { platform: "Apple TV", type: "rent", url: "https://tv.apple.com/" }
        ]
    },
    {
        title: "Parasite",
        description:
            "A struggling family cunningly ingratiates itself into the household of a wealthy family, leading to unexpected and increasingly dark consequences neither family sees coming.",
        releaseYear: 2019,
        genre: ["Comedy", "Drama", "Thriller"],
        duration: 132,
        director: "Bong Joon-ho",
        rating: 8.5,
        language: "Korean",
        posterUrl: "",
        cast: [
            "Song Kang-ho",
            "Lee Sun-kyun",
            "Cho Yeo-jeong",
            "Choi Woo-shik",
            "Park So-dam"
        ],
        watchOptions: [
            { platform: "Amazon Prime Video", type: "subscription", url: "https://www.primevideo.com/" }
        ]
    },
    {
        title: "Spirited Away",
        description:
            "A young girl wanders into a mysterious world of spirits after her parents are transformed, and must find courage and cleverness to save them and find her way back home.",
        releaseYear: 2001,
        genre: ["Animation", "Fantasy", "Adventure"],
        duration: 125,
        director: "Hayao Miyazaki",
        rating: 8.5,
        language: "Japanese",
        posterUrl: "",
        cast: [
            "Rumi Hiiragi",
            "Miyu Irino",
            "Mari Natsuki",
            "Takashi Naito"
        ],
        watchOptions: [
            { platform: "Netflix", type: "subscription", url: "https://www.netflix.com/in/" }
        ]
    },
    {
        title: "RRR",
        description:
            "Set during British colonial rule in 1920s India, two revolutionaries form an unlikely bond before their paths lead them toward a shared fight for their people's freedom.",
        releaseYear: 2022,
        genre: ["Action", "Drama"],
        duration: 187,
        director: "S. S. Rajamouli",
        rating: 7.9,
        language: "Telugu",
        posterUrl: "",
        cast: [
            "N. T. Rama Rao Jr.",
            "Ram Charan",
            "Alia Bhatt",
            "Ajay Devgn"
        ],
        watchOptions: [
            { platform: "ZEE5", type: "subscription", url: "https://www.zee5.com/" }
        ]
    },
    {
        title: "Everything Everywhere All at Once",
        description:
            "An overwhelmed laundromat owner discovers she must connect with parallel versions of herself across the multiverse to prevent an existential threat, while confronting fractures within her own family.",
        releaseYear: 2022,
        genre: ["Action", "Adventure", "Comedy", "Sci-Fi"],
        duration: 140,
        director: "Daniel Kwan, Daniel Scheinert",
        rating: 8.0,
        language: "English",
        posterUrl: "",
        cast: [
            "Michelle Yeoh",
            "Stephanie Hsu",
            "Ke Huy Quan",
            "Jamie Lee Curtis",
            "James Hong"
        ],
        watchOptions: [
            { platform: "SonyLIV", type: "subscription", url: "https://www.sonyliv.com/" }
        ]
    },
    {
        title: "Whiplash",
        description:
            "An ambitious young drummer at an elite music conservatory pushes himself to the brink under the demanding, often brutal mentorship of a ruthless instructor determined to find greatness.",
        releaseYear: 2014,
        genre: ["Drama", "Music"],
        duration: 106,
        director: "Damien Chazelle",
        rating: 8.4,
        language: "English",
        posterUrl: "",
        cast: [
            "Miles Teller",
            "J.K. Simmons",
            "Paul Reiser",
            "Melissa Benoist"
        ],
        watchOptions: [
            { platform: "Apple TV", type: "rent", url: "https://tv.apple.com/" },
            { platform: "Apple TV", type: "buy", url: "https://tv.apple.com/" }
        ]
    },
    {
        title: "Fight Club",
        description:
            "An unfulfilled office worker forms an underground club built around bare-knuckle fighting with a mysterious soap salesman, setting off a chain of events that spirals into something far more dangerous.",
        releaseYear: 1999,
        genre: ["Drama"],
        duration: 139,
        director: "David Fincher",
        rating: 8.4,
        language: "English",
        posterUrl: "",
        cast: [
            "Brad Pitt",
            "Edward Norton",
            "Helena Bonham Carter",
            "Meat Loaf"
        ],
        watchOptions: [
            { platform: "Netflix", type: "subscription", url: "https://www.netflix.com/in/" }
        ]
    },
    {
        title: "Get Out",
        description:
            "A young man's weekend visit to his girlfriend's family estate takes an unsettling turn as strange behavior and hidden secrets reveal a disturbing truth beneath the family's welcoming facade.",
        releaseYear: 2017,
        genre: ["Horror", "Mystery", "Thriller"],
        duration: 104,
        director: "Jordan Peele",
        rating: 7.7,
        language: "English",
        posterUrl: "",
        cast: [
            "Daniel Kaluuya",
            "Allison Williams",
            "Catherine Keener",
            "Bradley Whitford",
            "LaKeith Stanfield"
        ],
        watchOptions: [
            { platform: "JioHotstar", type: "subscription", url: "https://www.jiohotstar.com/" },
            { platform: "ZEE5", type: "rent", url: "https://www.zee5.com/" }
        ]
    },
    {
        title: "Coco",
        description:
            "Despite his family's generations-old ban on music, a young boy determined to prove his talent finds himself in the vibrant Land of the Dead, uncovering the real story behind his family's history.",
        releaseYear: 2017,
        genre: ["Animation", "Adventure", "Comedy", "Fantasy"],
        duration: 105,
        director: "Lee Unkrich",
        rating: 8.2,
        language: "English",
        posterUrl: "",
        cast: [
            "Anthony Gonzalez",
            "Gael García Bernal",
            "Benjamin Bratt",
            "Alanna Ubach"
        ],
        watchOptions: [
            { platform: "JioHotstar", type: "subscription", url: "https://www.jiohotstar.com/" }
        ]
    },
    {
        title: "La La Land",
        description:
            "An aspiring actress and a dedicated jazz musician fall for each other in Los Angeles while chasing their creative dreams, discovering how ambition and love can pull in different directions.",
        releaseYear: 2016,
        genre: ["Comedy", "Drama", "Music", "Romance"],
        duration: 128,
        director: "Damien Chazelle",
        rating: 7.9,
        language: "English",
        posterUrl: "",
        cast: [
            "Ryan Gosling",
            "Emma Stone",
            "John Legend",
            "Rosemarie DeWitt"
        ],
        watchOptions: [
            { platform: "Netflix", type: "subscription", url: "https://www.netflix.com/in/" }
        ]
    },
    {
        title: "Pulp Fiction",
        description:
            "The lives of two hitmen, a boxer, a gangster's wife, and a pair of small-time crooks intertwine across a series of interconnected stories set in the seedy underworld of Los Angeles.",
        releaseYear: 1994,
        genre: ["Crime", "Drama"],
        duration: 154,
        director: "Quentin Tarantino",
        rating: 8.5,
        language: "English",
        posterUrl: "",
        cast: [
            "John Travolta",
            "Samuel L. Jackson",
            "Uma Thurman",
            "Bruce Willis",
            "Ving Rhames"
        ],
        watchOptions: [
            { platform: "Netflix", type: "subscription", url: "https://www.netflix.com/in/" }
        ]
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