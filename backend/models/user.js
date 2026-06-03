const mongoose = require("mongoose");

const userModel_Schema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String ,
        required : true
    }
})

const userModel = mongoose.model("user" , userModel_Schema);
module.exports = userModel;