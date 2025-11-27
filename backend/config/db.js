const mongoose = require("mongoose");

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected sucessfully")
    }
    catch(err){
        console.error("MonogoDB connection failes.", err)
    }
}

module.exports = connectDB;