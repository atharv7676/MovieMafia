import { body, validationResult } from "express-validator";

const registerValidation = [
    body("name")
        .notEmpty().withMessage("Name is Required")
        .trim()
        .isLength({ min: 3, max: 30 })
        .custom((value) => {
            if (/\d/.test(value)) {
                throw new Error("name should  not contain numbers")
            }
            return true
        }),

    body("email")
        .notEmpty()
        .isEmail().withMessage("Please enter a valid email")
        .normalizeEmail()
        .custom(async (value) => {

            const existingUser = await User.findOne({
                email: value
            });

            if (existingUser) {
                throw new Error("Email already exists");
            }

            return true;
        }),


    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({
            min: 8
        })
        .isStrongPassword().withMessage(
            "Password must contain uppercase, lowercase, number and special character."
        )
]

export {registerValidation}  