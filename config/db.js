const mongoose = require("mongoose");
const config = require("config");
const db = config.get("url");

const connectDb = async() => {
    try {
        await mongoose.connect(db);
        console.log("MongDB Connected...");
    } catch (error) {
        console.error(error.message);
        //Exit process with failure.
        process.exit(1);
    }
};

module.exports = connectDb;