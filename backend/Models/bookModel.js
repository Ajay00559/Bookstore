const mongoose = require("mongoose");
 

const bookModel = new mongoose.Schema(
    {
         title: {
            type: String,
            
            required: [true, "data is required"],
        },
         author: {
            type: String,
            
            required: [true, "data is required"],
        },
         categary:{
            type: String,
            required: [true,"data is required"]
        },
         price:{
            type: Number,
            required: [true,"data is required"]
        },
         
    },
    { timestamps: true }
);

 
const book = mongoose.model("book", bookModel);

module.exports = book;