const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose")

mongoose.connect(`${config.get("MONGODB_URI")}/RecipeDB`)
.then(function(){
    dbgr("MongoDB connected successfully")
})
.catch(function(err){
    dbgr("MongoDB connection error: ", err.message)
})
module.exports = mongoose.connection;