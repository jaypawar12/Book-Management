const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: { type: String },
    author: { type: String },
    category: { type: String },
    publish_year: { type: Number },
    isbn_num: { type: Number },
    price: { type: Number },
    cover_image: { type: String },
    created_at: { type: String },
    updated_at: { type: String },
});

module.exports = mongoose.model("Book", BookSchema, "Book");
