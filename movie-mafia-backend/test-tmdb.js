import dotenv from "dotenv";

dotenv.config();

const key = process.env.TMDB_API_KEY;

console.log("Key exists:", Boolean(key));
console.log("Key length:", key?.length);

const url = new URL("https://api.themoviedb.org/3/configuration");
url.searchParams.set("api_key", key);

console.log("Testing TMDB...");

try {
    const response = await fetch(url);

    console.log("Status:", response.status);

    const data = await response.json();

    console.log(data);
} catch (error) {
    console.log("Fetch error:", error.message);
}