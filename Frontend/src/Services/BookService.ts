import axios from "axios";

class BookService {
    authBaseURL = "http://localhost:8000/api/book";

    featchAllBooks() {
        try {
            const res = axios.get(this.authBaseURL);

            return res
        } catch (err) {

        }
    }
}

export const bookService = new BookService();