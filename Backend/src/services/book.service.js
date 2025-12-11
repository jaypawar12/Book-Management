const Book = require("../models/book.model");

class BookService {

    async addBook(data) {
        return await Book.create(data);
    }

    async getAllBooks() {
        return await Book.find({});
    }

    async getSingleBook(id) {
        return await Book.findOne({ _id: id });
    }

    async updateBook(id, data) {
        return await Book.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteBook(id) {
        return await Book.findByIdAndDelete(id);
    }
}

module.exports = BookService;
