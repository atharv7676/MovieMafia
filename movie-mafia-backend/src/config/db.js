import mongoose from "mongoose";
import dns from "dns";

const ORIGINAL_DNS_SERVERS = dns.getServers();

const connectDb = async () => {
    try {
        dns.setServers(["8.8.8.8", "1.1.1.1"]);

        await mongoose.connect(process.env.MOVIE_URI);

        dns.setServers(ORIGINAL_DNS_SERVERS);

        console.log("MongoDB Connected");
    } catch (error) {
        console.error(
            "Database Connection Failed:",
            error.message
        );

        process.exit(1);
    }
};

export default connectDb;