import mongoose from "mongoose";
import dns from "dns";

// Use reliable DNS resolvers for the whole process lifetime.
// (Some hosts, including Render, occasionally have flaky SRV/DNS resolution
// for mongodb+srv:// URIs — keeping these set permanently, rather than
// restoring the originals after the first connect, avoids that recurring.)
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const connectDb = async (retries = MAX_RETRIES) => {
    try {
        await mongoose.connect(process.env.MOVIE_URI, {
            serverSelectionTimeoutMS: 10000, // fail fast instead of hanging
        });

        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Database Connection Failed:", error.message);

        if (retries > 0) {
            console.log(
                `Retrying connection in ${RETRY_DELAY_MS / 1000}s... (${retries} attempts left)`
            );
            await sleep(RETRY_DELAY_MS);
            return connectDb(retries - 1);
        }

        console.error("Exhausted all retries. Exiting.");
        process.exit(1);
    }
};

// Handle drops that happen AFTER the initial successful connection
// (e.g. Atlas maintenance, network blips) so the app doesn't just die silently.
mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected. Attempting to reconnect...");
    connectDb();
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err.message);
});

mongoose.connection.on("reconnected", () => {
    console.log("MongoDB reconnected");
});

export default connectDb;