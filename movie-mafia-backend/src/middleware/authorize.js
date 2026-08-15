const authorize = (...roles) => {
    return (req, res, next) => {

        console.log("3️⃣ authorize reached", req.user.role);
        // Check if user's role is allowed
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Forbidden Access",
            });
        }

        next();
    };
};

export default authorize;