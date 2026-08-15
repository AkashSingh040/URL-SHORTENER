//it is used to define what a URL document look like in MongoDB
//no HTTP logic or controller logic

// URL
// ├── originalUrl -> where we redirect
// ├── shortCode   -> unique identifier used in get /abJBB3
// ├── clicks      -> Number of times shortened url used
// ├── createdAt   -> date and time when created
// └── updatedAt   ->similarly when updated


// Model = Data structure + database interaction
const mongoose=require("mongoose");
const { type } = require("node:os");

const urlSchema = new mongoose.Schema(
    {
        originalUrl:{
            type:String,
            required: true,
            trim: true
        },
        shortCode:{
            type:String,
            required:true,
            unique: true,
            index: true,
            trim:true
        },
        clicks: {
            type: Number,
            default:0,
            min:0
        }
    },
    {
        timestamps: true// instead of manually defining updatedAt AND createdAt it is used and it automatically maintain them
    }
);

const URL = mongoose.model("URL", urlSchema);//This converts our schema into a Mongoose model

module.exports =URL;

//we will frequently query like URL.findOne({shortCode})
// URL.create(...)
// URL.findOne(...)
// URL.findById(...)
// URL.findOneAndUpdate(...)
// The model acts as our application's interface to the MongoDB collection.
