const express = require('express');//need to create HTTP application

const urlRoutes =require("./routes/url.routes");

const notFound =require("./middleware/notFound.middleware");
const errorHandler=require("./middleware/error.middleware");


const { message } = require('statuses');
const { redirectToOriginalUrl } = require('./controllers/url.controller');

const app=express();//create our application instance

app.use(express.static("public"));//to load index.js when localhost:5000 opened
//Parse incoming JSON request (JSON Middleware)
app.use(express.json());

//HEALTH CHECK

app.get('/health',(req,res)=>{//use during deployment and monitoring as well
    res.status(200).json({
        success:true,
        message:"URL Shortener API is running"
    });
});

app.use("/",urlRoutes);

// app.use("/api/v1/urls",urlRoutes);
// app.get("/:shortCode",redirectToOriginalUrl); if use it will work but we have to separately import redirectToOriginalUrl

//error handelers must come after all routes
app.use(notFound);
app.use(errorHandler);//must be final middleware


module.exports=app;
//exporting so that server.js can access it

//configure server only