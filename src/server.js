//starting server is main responsibility of this file
require("dotenv").config(); //Load .env variables in process.env.PORT LIKE things

const app = require("./app"); //importing app.js

const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// app.listen(PORT,()=>{
//     console.log(`Server running on port ${PORT}`)
// });//point where our application start taking request from network

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(`Server startup failed : `, error.message);
    process.exit(1);
  }
};
//Don't accept application traffic until the required database connection is ready.

startServer();
