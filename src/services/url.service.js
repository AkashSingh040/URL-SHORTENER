//it answers basic question
// What should the application do when someone wants to create or resolve a short URL?

/*
Create short URL
    originalUrl
        ↓
    Generate short code
        ↓
    Check collision
        ↓
    Save URL
        ↓
    Return URL document

*/

/*
shortCode
    ↓
Find URL
    ↓
Increment clicks
    ↓
Return URL document

*/
//we will write business logic here  -> no req, res,res,status as that's controller's job

const { short } = require("webidl-conversions");
const URL=require("../models/url.model");
const generateCode=require("../utils/generateCode");
//import important files

const createShortUrl = async(originalUrl)=>{ //recieve data only it need nothing more and nothing less
    let shortCode;
    let existingUrl;

    do{
        shortCode=generateCode();
        existingUrl=await URL.findOne({shortCode});//if nothing match then null return by this 
    }while(existingUrl);//check collision with already existing data

    const url = await URL.create({
        originalUrl,
        shortCode
    });
    return url;//controller will decide what to do with this url data
};

const getOriginalUrl = async (shortCode) =>{
    const url=await URL.findOne({shortCode});

    if(!url) return null;

    url.clicks +=1;//it has limitation but good for current version (learning) later we will use concurrency and atomic database operations ($inc)
    await url.save();
    return url;
};

module.exports={
    createShortUrl,getOriginalUrl
};