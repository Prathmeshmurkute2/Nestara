const errorHandler = (err, req, res, next) =>{
    console.error(err);

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        message: err.message || "Server Error",
    });

};

export default errorHandler;