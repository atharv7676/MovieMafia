import mongoose from "mongoose"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        trim: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        select: false,
        required: true,
    },
    role: {
        type: String, enum: ["user", "admin"],
        default: "user",
    },

    subscription: { type: String, enum: ["free", "premium", "pro"], default: "free" },

    refreshToken : {
        type : String,
    }
},
    {
        timestamps: true,
    }
)

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(
        enteredPassword,
        this.password
    )
}

userSchema.statics.findByEmail = async function (email) {
    return await this.findOne({ email }).select("+password");
}


userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
});



userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};


userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email : this.email,
            role : this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

userSchema.index({email : 1});

const User = mongoose.model("User", userSchema);

export default User