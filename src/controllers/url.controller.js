// Controller's job is to translate HTTP request into service calls and service results into HTTP responses
//business logic stay in service layer

// two responsibilities
// POST /api/v1/urls   -> create URL
// GET /:shortCode     -> Redirect

const { message } = require("statuses");
const urlService=require("../services/url.service");

const createShortUrl= async (req,res,next) =>{//next ->pass control to next middleware
    try{
        const {originalUrl} =req.body;
        if(!originalUrl){
            return res.status(400).json({
                success:false,
                message:"originalUrl is required"
            });
        }

        const url=await urlService.createShortUrl(originalUrl);
        return res.status(201).json({
            success:true,
            message:"Short URL created successfully",
            data: {
                originalUrl:url.originalUrl,
                shortCode:url.shortCode,
                shortUrl:`${req.protocol}://${req.get("host")}/${url.shortCode}`
            }
        });
    }
    catch(error){
        next(error);//instead of doing this error handling thing in each contoller we use centralized error handling middleware
    }
};

const redirectToOriginalUrl = async (req,res,next) =>{
    try{
        const {shortCode}=req.params;

        const url=await urlService.getOriginalUrl(shortCode);
        if(!url){
            return res.status(404).json({
                success: false,
                message: "Short URL not found"
            });
        }
        return res.redirect(url.originalUrl);
    }
    catch(error){
        next(error);
    }
};

module.exports ={
    createShortUrl,redirectToOriginalUrl
};