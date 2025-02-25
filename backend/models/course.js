const mongoose = require("mongoose");


const courseSchema = new mongoose.Schema({
    name:{type:String, required:true},
    description: {type:String, required: true},
    subject: {type:String, required: true},
    credits: {type:Number, min:1, max:4, required: true}
})

module.exports = mongoose.model("Course", courseSchema)