import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        minlength: 100,
        maxlength: 300,
        required: true,
    },

    releaseYear: Number,

    genre: {
        type: [String],
        required: true,
    },

    duration: {
        type: Number,
        min: 30,
        required: true,
    },

    director: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Director",
        required: true,
    },

    rating: {
        type: Number,
        min: 0,
        max: 10,

    },

    language: {
        type: String,
        trim: true,
        required: true,
    },

    poster: {
        url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    },

    cast: {
        type: [String],
    },
},
    {
        timestamps: true,
        toJSON : {
            virtuals : true,
        },
        toObject : {
            virtuals : true
        }
    }
)

movieSchema.virtual("movieAge").get(function () {

    const currentYear = new Date().getFullYear();

    return currentYear - this.releaseYear;

});

movieSchema.index({title : "text"});
movieSchema.index({ genre: 1 });
movieSchema.index({ language: 1 });
movieSchema.index({ rating: -1 });
movieSchema.index({
    genre: 1,
    language: 1,
    rating: -1
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie