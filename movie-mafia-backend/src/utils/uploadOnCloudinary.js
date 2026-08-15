import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }
        const result = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type: "image",
            }
        );
        
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
            console.log("5. Local file deleted");
        }

        return result;

    } catch (error) {
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
};

export default uploadOnCloudinary;