import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Book } from '../../types/book';
import { bookService } from '../../services/bookService';

interface BookState {
    books: Book[];
    loading: boolean;
    error: string | null;
}

const initialState: BookState = {
    books: [],
    loading: false,
    error: null,
};

// Async Thunks
export const fetchBooks = createAsyncThunk('books/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const books = await bookService.getAll();
        return Array.isArray(books) ? books : [];
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch books');
    }
});

export const requestAddBook = createAsyncThunk(
    'books/add',
    async ({ book, coverImage }: { book: Omit<Book, '_id'>; coverImage?: File }, { rejectWithValue }) => {
        try {
            const newBook = await bookService.add(book, coverImage);
            return newBook;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add book');
        }
    }
);

export const requestUpdateBook = createAsyncThunk(
    'books/update',
    async ({ id, book, coverImage }: { id: string; book: Omit<Book, '_id'>; coverImage?: File | null }, { rejectWithValue }) => {
        try {
            const updatedBook = await bookService.update(id, book, coverImage);
            return updatedBook;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update book');
        }
    }
);

export const requestDeleteBook = createAsyncThunk('books/delete', async (id: string, { rejectWithValue }) => {
    try {
        await bookService.delete(id);
        return id;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to delete book');
    }
});

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
                state.loading = false;
                state.books = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Add
            .addCase(requestAddBook.fulfilled, (state, action: PayloadAction<Book>) => {
                state.books.push(action.payload);
            })
            // Update
            .addCase(requestUpdateBook.fulfilled, (state, action: PayloadAction<Book>) => {
                const index = state.books.findIndex((b) => b._id === action.payload._id);
                if (index !== -1) {
                    state.books[index] = action.payload;
                }
            })
            // Delete
            .addCase(requestDeleteBook.fulfilled, (state, action: PayloadAction<string>) => {
                state.books = state.books.filter((b) => b._id !== action.payload);
            });
    },
});

export default bookSlice.reducer;
