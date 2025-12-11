const { StatusCodes } = require("http-status-codes");
const { errorResponse, successResponse } = require("../utils/responseFormat");
const { MSG } = require("../utils/message");
const BookService = require("../services/book.service");
const moment = require("moment");

const bookService = new BookService();

exports.addBook = async (req, res) => {
    try {
        if (req.file) {
            req.body.cover_image = req.file.path;

            req.body.created_at = moment().format("DD/MM/YYYY, h:mm:ss a");
            req.body.updated_at = moment().format("DD/MM/YYYY, h:mm:ss a");

            const newBook = await bookService.addBook(req.body);

            if (!newBook) {
                return res.json(errorResponse(StatusCodes.BAD_REQUEST, true, MSG.BOOK_CREATION_FAILED));
            }

            return res.json(successResponse(StatusCodes.CREATED, false, MSG.BOOK_CREATED, newBook));
        } else {
            return res.json(errorResponse(StatusCodes.BAD_REQUEST, true, "Image is not Found"));
        }

    } catch (err) {
        console.log(err);
        return res.json(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR));
    }
};

exports.getAllBooks = async (req, res) => {
    try {
        const books = await bookService.getAllBooks();
        return res.json(successResponse(StatusCodes.OK, false, MSG.BOOKS_FETCH_SUCCESS, books));
    } catch (err) {
        console.log(err);
        return res.json(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR));
    }
};

exports.getSingleBook = async (req, res) => {
    try {
        const book = await bookService.getSingleBook(req.params.bookId);

        if (!book) {
            return res.json(errorResponse(StatusCodes.BAD_REQUEST, true, MSG.BOOK_NOT_FOUND));
        }

        return res.json(successResponse(StatusCodes.OK, false, MSG.BOOK_FETCH_SUCCESS, book));
    } catch (err) {
        console.log(err);
        return res.json(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR));
    }
};

exports.updateBook = async (req, res) => {
    try {
        if (req.file) {
            req.body.cover_image = req.file.path;
        }
        req.body.updated_at = moment().format("DD/MM/YYYY, h:mm:ss a");

        const updated = await bookService.updateBook(req.params.bookId, req.body);

        if (!updated) {
            return res.json(errorResponse(StatusCodes.BAD_REQUEST, true, MSG.BOOK_NOT_FOUND));
        }

        return res.json(successResponse(StatusCodes.OK, false, MSG.BOOK_UPDATED, updated));
    } catch (err) {
        console.log(err);
        return res.json(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR));
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const deleted = await bookService.deleteBook(req.params.bookId);

        if (!deleted) {
            return res.json(errorResponse(StatusCodes.BAD_REQUEST, true, MSG.BOOK_NOT_FOUND));
        }

        return res.json(successResponse(StatusCodes.OK, false, MSG.BOOK_DELETED, deleted));
    } catch (err) {
        console.log(err);
        return res.json(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR));
    }
};
