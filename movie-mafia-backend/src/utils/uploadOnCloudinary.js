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
                resource_type: "auto",
            }
        );

        // Delete temporary file
        fs.unlinkSync(localFilePath);

        return result;

    } catch (error) {

        // Delete file if upload fails
        if (localFilePath) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }

};

export default uploadOnCloudinary;