import mongoose from "mongoose"

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MOVIE_URI);
        logger.info("MongoDB Connected");
        
    } catch (error) {
        console.error("Database Connection Failed:", error.message);
        process.exit(1);
    }
}
export default connectDb;