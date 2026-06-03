const mongoose = require("mongoose");
require('dotenv').config();
const mongo_url = process.env.MONGO;

const connectDb = async ()=>{
    await mongoose.connect(mongo_url);
    // console.log(mongo_url);
    console.log("Connected to db");

}

module.exports = connectDb;
