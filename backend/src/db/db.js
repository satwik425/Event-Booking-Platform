const mongoose =require("mongoose");

const dbconnect = ()=>{
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connected To Database");
}

module.exports = dbconnect