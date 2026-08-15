const mongoose = require("mongoose");
//mongoose is ODM(Object Documents Mapper) it allows to work with MongoDB using models and schemas


const connectDB=async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully");
    }
    catch(error){
        console.log("MongoDB connection failed : ",error.message);
        process.exit(1);// 1 indicates that process exits due to an error
    }
};

//Wrapping connection in function rather than immediately connecting
//as server.js can explicitly control startup sequence

module.exports = connectDB;