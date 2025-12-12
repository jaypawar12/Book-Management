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
        const book = await Book.findById(id);
        if (!book) return null;

        if (data.cover_image && book.cover_image) {
            try {
                const urlParts = book.cover_image.split("/");
                const filename = urlParts[urlParts.length - 1];
                const publicId = "Book-Management/" + filename.split(".")[0];

                await cloudinary.uploader.destroy(publicId);
            } catch (err) {
                console.error("Error deleting old Cloudinary image:", err);
            }
        }

        return await Book.findByIdAndUpdate(id, data, { new: true });
    }


    async deleteBook(id) {
        return await Book.findByIdAndDelete(id);
    }
}

module.exports = BookService;
