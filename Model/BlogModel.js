const mongoose = require('mongoose')


const blogSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    subDescription:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
    date:{
        type:String,
        required:true
    },
    blogImage:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
})

const blogs =mongoose.model("blogs",blogSchema)
module.exports= blogs