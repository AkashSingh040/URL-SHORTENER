const { message } = require("statuses");

const errorHandler = (err, req , res, next) => {
    const statusCode=res.statusCode >=400 ? res.statusCode :500;

    res.status(statusCode).json({
        success:false,
        message: err.message || "Internal Server Error"
    });
};

module.exports=errorHandler;

//normal middleware has 3 parameters but this has 4 why????
// because error handling middleware is recognized by its 4 parameters