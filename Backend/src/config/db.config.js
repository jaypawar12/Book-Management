const mongoose = require('mongoose');
const multer = require('multer');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected Successfully...");
    } catch (err) {
        console.log("Database Connection Failed:", err);
    }
};

module.exports = { connectDB };
