import axios from 'axios';
import { BOOKS } from '../config/api';
import type { Book } from '../types/book';

// Helper to get form data for multipart/form-data requests
const createFormData = (book: Omit<Book, '_id'>, coverImage?: File) => {
    const formData = new FormData();
    formData.append('title', book.title);
    formData.append('author', book.author);
    formData.append('category', book.category);
    formData.append('price', book.price.toString());
    formData.append('publish_year', book.publish_year.toString());
    formData.append('isbn_num', book.isbn_num.toString());
    // Removed description as it is not in backend model.

    if (coverImage) {
        formData.append('cover_image', coverImage);
    }
    return formData;
};

// Interface for Backend Response Wrapper
interface ApiResponse<T> {
    status: number;
    error: boolean;
    message: string;
    result: T;
}

export const bookService = {
    getAll: async () => {
        const response = await axios.get<ApiResponse<Book[]>>(BOOKS.GET_ALL);
        return response.data.result;
    },

    getById: async (id: string) => {
        const response = await axios.get<ApiResponse<Book>>(BOOKS.GET_SINGLE(id));
        return response.data.result;
    },

    add: async (book: Omit<Book, '_id' | 'created_at' | 'updated_at'>, coverImage?: File) => {
        const formData = createFormData(book as any, coverImage);
        const response = await axios.post<ApiResponse<Book>>(BOOKS.ADD, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.result;
    },

    update: async (id: string, book: Omit<Book, '_id' | 'created_at' | 'updated_at'>, coverImage?: File | null) => {
        const formData = createFormData(book as any, coverImage || undefined);
        const response = await axios.put<ApiResponse<Book>>(BOOKS.UPDATE(id), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.result;
    },

    delete: async (id: string) => {
        await axios.delete(BOOKS.DELETE(id));
    }
};
