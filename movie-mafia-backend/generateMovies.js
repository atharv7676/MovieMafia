import "./src/config/env.js";
import connectDb from "./src/config/db.js";
import fs from "fs/promises";
import Movie from "./src/models/movieModel.js";
import cloudinary from "./src/config/cloudinary.js";
const TMDB_API_KEY = process.env.TMDB_API_KEY;

if (!TMDB_API_KEY) {
    console.error("TMDB_API_KEY is missing from .env");
    process.exit(1);
}

if (!process.env.MOVIE_URI) {
    console.error("MOVIE_URI is missing from .env");
    process.exit(1);
}

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const args = process.argv.slice(2);
const countArg = args.find((arg) => arg.startsWith("--count="));

const TARGET_COUNT = countArg
    ? parseInt(countArg.split("=")[1], 10)
    : 50;

const OUTPUT_FILE = "./data/generatedMovies.js";

const GENRE_MAP = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western"
};

const LANGUAGE_MAP = {
    en: "English",
    hi: "Hindi",
    ta: "Tamil",
    te: "Telugu",
    kn: "Kannada",
    ml: "Malayalam",
    bn: "Bengali",
    mr: "Marathi",
    pa: "Punjabi",
    ko: "Korean",
    ja: "Japanese",
    zh: "Chinese",
    fr: "French",
    es: "Spanish",
    de: "German",
    it: "Italian",
    pt: "Portuguese",
    ru: "Russian"
};

const PLATFORM_URLS = {
    Netflix: "https://www.netflix.com/in/",
    "Amazon Prime Video": "https://www.primevideo.com/",
    "Prime Video": "https://www.primevideo.com/",
    "Amazon Video": "https://www.primevideo.com/",
    "Amazon Prime Video with Ads": "https://www.primevideo.com/",
    "MGM Plus Amazon Channel": "https://www.primevideo.com/",
    JioHotstar: "https://www.jiohotstar.com/",
    "Disney Plus": "https://www.disneyplus.com/",
    "Disney Plus Hotstar": "https://www.jiohotstar.com/",
    "Sony LIV": "https://www.sonyliv.com/",
    "Sony Liv": "https://www.sonyliv.com/",
    "Sony Pictures Amazon Channel": "https://www.primevideo.com/",
    "VI movies and tv": "https://www.jiohotstar.com/",
    ZEE5: "https://www.zee5.com/",
    Zee5: "https://www.zee5.com/",
    "Apple TV": "https://tv.apple.com/in/",
    "Apple TV Plus": "https://tv.apple.com/in/",
    "Apple TV Store": "https://tv.apple.com/in/",
    YouTube: "https://www.youtube.com/",
    "Google Play Movies": "https://play.google.com/store/movies",
    "Google TV": "https://tv.google/",
    MXPlayer: "https://www.mxplayer.in/",
    "MX Player": "https://www.mxplayer.in/",
    Aha: "https://www.aha.video/",
    Lionsgate: "https://www.lionsgateplay.com/",
    "Lionsgate Play": "https://www.lionsgateplay.com/",
    "Lionsgate Play Apple TV Channel": "https://www.lionsgateplay.com/",
    "Lionsgate Play Amazon Channel": "https://www.lionsgateplay.com/",
    "Lionsgate+ Amazon Channels": "https://www.lionsgateplay.com/",
    Hoichoi: "https://www.hoichoi.tv/",
    "Sun NXT": "https://www.sunnxt.com/",
    ManoramaMAX: "https://www.manoramamax.com/",
    MUBI: "https://mubi.com/",
    "MUBI Amazon Channel": "https://www.primevideo.com/",
    Crunchyroll: "https://www.crunchyroll.com/",
    "Crunchyroll Amazon Channel": "https://www.primevideo.com/"
};

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

async function tmdbGet(path, params = {}, retries = 5) {
    const url = new URL(`${TMDB_BASE_URL}${path}`);

    url.searchParams.set("api_key", TMDB_API_KEY);

    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
    });

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                const errorText = await response.text();

                throw new Error(
                    `TMDB request failed: ${response.status} ${response.statusText} - ${errorText}`
                );
            }

            return await response.json();

        } catch (error) {
            const isNetworkError = error.cause?.code === "ECONNRESET";

            if (isNetworkError && attempt < retries) {
                console.log(
                    `TMDB network error (attempt ${attempt}/${retries}), retrying...`
                );
                await sleep(300 * attempt);
                continue;
            }

            throw error;
        }
    }
}

async function getExistingTmdbIds() {
    const movies = await Movie.find(
        {
            tmdbId: {
                $exists: true,
                $ne: null
            }
        },
        {
            tmdbId: 1,
            _id: 0
        }
    ).lean();

    return new Set(
        movies
            .map((movie) => movie.tmdbId)
            .filter(Boolean)
    );
}

async function getCandidateMovies(targetCount, existingTmdbIds) {
    const candidates = [];

    // 🇰🇷 Get Korean movies first
    const koreanMovies = await tmdbGet("/discover/movie", {
        with_original_language: "ko",
        sort_by: "popularity.desc",
        region: "IN",
        page: 1
    });

    for (const movie of koreanMovies.results || []) {
        if (existingTmdbIds.has(movie.id)) {
            continue;
        }

        if (!movie.poster_path) {
            continue;
        }

        if (!movie.id) {
            continue;
        }

        candidates.push(movie);
    }
    const lists = [
        "popular",
        "top_rated",
        "now_playing",
        "upcoming"
    ];

    let page = 1;

    while (
        candidates.length < targetCount * 4 &&
        page <= 30
    ) {
        for (const list of lists) {
            const data = await tmdbGet(
                `/movie/${list}`,
                {
                    page,
                    region: "IN"
                }
            );

            for (const movie of data.results || []) {
                if (existingTmdbIds.has(movie.id)) {
                    continue;
                }

                if (!movie.poster_path) {
                    continue;
                }

                if (!movie.id) {
                    continue;
                }

                candidates.push(movie);
            }

            await sleep(120);
        }

        page++;
    }

    // Discover endpoint - sweep by year to find movies outside the standard lists
    const currentYear = new Date().getFullYear();

    for (let year = currentYear; year >= currentYear - 40; year--) {
        if (candidates.length >= targetCount * 4) {
            break;
        }

        const data = await tmdbGet(
            `/discover/movie`,
            {
                region: "IN",
                primary_release_year: year,
                sort_by: "popularity.desc",
                page: 1
            }
        );

        for (const movie of data.results || []) {
            if (existingTmdbIds.has(movie.id)) {
                continue;
            }

            if (!movie.poster_path) {
                continue;
            }

            if (!movie.id) {
                continue;
            }

            candidates.push(movie);
        }

        await sleep(120);
    }

    const uniqueMovies = [];
    const seen = new Set();

    for (const movie of candidates) {
        if (seen.has(movie.id)) {
            continue;
        }

        seen.add(movie.id);
        uniqueMovies.push(movie);
    }

    return uniqueMovies;
}

function getGenres(details) {
    return (details.genres || [])
        .map((genre) => GENRE_MAP[genre.id])
        .filter(Boolean);
}

function getLanguage(code) {
    return LANGUAGE_MAP[code] || code || "Unknown";
}

function getDirector(credits) {
    const director = (credits.crew || []).find(
        (member) => member.job === "Director"
    );

    return director?.name || null;
}

function getCast(credits) {
    return (credits.cast || [])
        .slice(0, 6)
        .map((member) => member.name)
        .filter(Boolean);
}

function buildWatchOptions(providerData) {
    if (!providerData) {
        return [];
    }

    const watchOptions = [];

    const addProviders = (providers, type) => {
        for (const provider of providers || []) {
            const platform = provider.provider_name;
            const url = PLATFORM_URLS[platform];

            if (!url) {
                console.log(`Unmapped provider: ${platform}`);
                continue;
            }

            watchOptions.push({
                platform,
                type,
                url
            });
        }
    };

    addProviders(providerData.flatrate, "subscription");
    addProviders(providerData.free, "free");
    addProviders(providerData.rent, "rent");
    addProviders(providerData.buy, "buy");

    const unique = new Map();

    for (const option of watchOptions) {
        const key = `${option.platform}|${option.type}`;

        if (!unique.has(key)) {
            unique.set(key, option);
        }
    }

    return [...unique.values()];
}

async function uploadPosterToCloudinary(tmdbId, posterPath) {
    const posterUrl =
        `${TMDB_IMAGE_BASE_URL}${posterPath}`;

    const result =
        await cloudinary.uploader.upload(
            posterUrl,
            {
                folder: "movie-mafia/movies",
                public_id: `tmdb-${tmdbId}`,
                overwrite: true,
                resource_type: "image"
            }
        );

    return {
        url: result.secure_url,
        public_id: result.public_id
    };
}

async function buildMovieRecord(movie) {
    const details = await tmdbGet(
        `/movie/${movie.id}`
    );

    const credits = await tmdbGet(
        `/movie/${movie.id}/credits`
    );

    const providers = await tmdbGet(
        `/movie/${movie.id}/watch/providers`
    );

    const director = getDirector(credits);
    const cast = getCast(credits);
    const genres = getGenres(details);

    if (!director) {
        return null;
    }

    if (cast.length === 0) {
        return null;
    }

    if (!details.runtime || details.runtime < 30) {
        return null;
    }

    if (!details.release_date) {
        return null;
    }

    if (!details.poster_path) {
        return null;
    }

    if (
        !details.overview ||
        details.overview.trim().length < 50
    ) {
        return null;
    }

    if (genres.length === 0) {
        return null;
    }

    const poster =
        await uploadPosterToCloudinary(
            details.id,
            details.poster_path
        );

    const indiaProviders =
        providers?.results?.IN || null;

    const watchOptions =
        buildWatchOptions(indiaProviders);

    return {
        title: details.title,

        description: details.overview
            .trim()
            .slice(0, 300),

        releaseYear: parseInt(
            details.release_date.slice(0, 4),
            10
        ),

        genre: genres,

        duration: details.runtime,

        director,

        rating: details.vote_average
            ? Math.round(
                details.vote_average * 10
            ) / 10
            : 0,

        language: getLanguage(
            details.original_language
        ),

        poster,

        watchOptions,

        cast,

        tmdbId: details.id
    };
}

async function main() {
    console.log(`Target movies: ${TARGET_COUNT}`);

    await connectDb();

    console.log("MongoDB connected");

    const existingTmdbIds =
        await getExistingTmdbIds();

    console.log(
        `Existing TMDB movies: ${existingTmdbIds.size}`
    );

    let candidates = [];

    try {
        candidates = await getCandidateMovies(
            TARGET_COUNT,
            existingTmdbIds
        );
    } catch (error) {
        console.error(
            `Failed to fetch candidates from TMDB: ${error.message}`
        );
        console.error("Aborting — no candidates available.");
        return;
    }

    console.log(
        `Candidates found: ${candidates.length}`
    );
    const results = [];

    for (const candidate of candidates) {
        if (results.length >= TARGET_COUNT) {
            break;
        }

        try {
            const exists = await Movie.exists({
                tmdbId: candidate.id
            });

            if (exists) {
                continue;
            }

            const movie =
                await buildMovieRecord(candidate);

            if (!movie) {
                continue;
            }

            try {
                await Movie.create(movie);
            } catch (dbError) {
                console.error(
                    `MongoDB insert failed for ${candidate.title}: ${dbError.message}`
                );
                continue;
            }

            results.push(movie);

            console.log(
                `${results.length}/${TARGET_COUNT} ${movie.title}`
            );

            console.log(
                `Watch options: ${movie.watchOptions.length}`
            );

            await sleep(150);
        } catch (error) {
            console.error(
                `Skipped ${candidate.title}: ${error.message}`
            );
        }
    }

    if (results.length === 0) {
        console.log("No new movies generated.");
        return;
    }

    await fs.mkdir("./data", {
        recursive: true
    });

    const fileContent = `const movies = ${JSON.stringify(
        results,
        null,
        4
    )};

export default movies;
`;

    await fs.writeFile(
        OUTPUT_FILE,
        fileContent,
        "utf8"
    );

    console.log(
        `Generated ${results.length} movies`
    );

    console.log(
        `Saved to MongoDB: ${results.length}`
    );

    console.log(
        `File: ${OUTPUT_FILE}`
    );
}

main().catch((error) => {
    console.error("Generator failed:");
    console.error(error);
    process.exit(1);
});