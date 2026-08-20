import axios from "axios";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";

const uploadTMDBPoster = async (posterUrl) => {
    try {
        if (!posterUrl) {
            return null;
        }

        const filePath = `uploads/tmdb-${Date.now()}.jpg`;

        const response = await axios.get(posterUrl, {
            responseType: "arraybuffer",
            timeout: 15000,
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Accept": "image/*",
            },
        });

        fs.writeFileSync(filePath, response.data);

        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: "image",
        });


        fs.unlinkSync(filePath);

        return result;

    } catch (error) {
        throw error;
    }
};

export default uploadTMDBPoster;