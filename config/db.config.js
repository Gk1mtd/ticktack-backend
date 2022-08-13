// imports mongoose and URL for DB
const mongoose = require("mongoose")
const {MONGO_DB_URL} = process.env

// connects mongoose to mongo_db
async function connectDB () {
    try {
        await mongoose.connect(MONGO_DB_URL)
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connectDB };