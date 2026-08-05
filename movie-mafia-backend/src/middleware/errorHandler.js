const errorHandler = (err, req, res, next) =>{
    res.status(error.statusCode).json({
        success : false,
        message : err.message || "Internal Server Error"
    })
}

export default errorHandler;