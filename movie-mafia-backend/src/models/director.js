import mongoose from "mongoose";

const directorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    dateOfBirth: {
        type: Date,
    },

    nationality: {
        required: true,
        type: String,
    },

    biography: {
        type: String,
        minLength: 100,
        maxLength: 400,
        required : true,
    },

    photo: {
        url: {
            type: String,
            required: true,
        },
        public_id: {
            type: String,
            required: true,
        }
    },

    awards: {
        type: [String],
        default : [],
    }
},
    {
        timestamps: true,
    }
)

const Director = mongoose.model("Director", directorSchema)

export default Director;