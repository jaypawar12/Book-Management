const express = require("express");
const {
    addBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook
} = require("../controllers/book.controller");
const multer = require("multer");
const { storage } = require('../config/cloudinary.config')

const upload = multer({ storage });

const route = express.Router();

route.post("/", upload.single("cover_image"), addBook);

route.get("/", getAllBooks);

route.get("/:bookId", getSingleBook);

route.put("/:bookId", upload.single("cover_image"), updateBook);

route.delete("/:bookId", deleteBook);

module.exports = route;
