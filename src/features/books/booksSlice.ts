import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { isApiOk, type Book } from "../../types/book";
import { fetchBooksApi } from "../../api/booksApi";

export interface BooksState {
    items: Book[];
    borrowedIds: string[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    warning: string | null;
}

const initialState: BooksState = {
    items: [],
    borrowedIds: [],
    status: 'idle',
    error: null,
    warning: null,
};

export const loadBooks = createAsyncThunk<Book[], boolean | undefined>(
    'books/loadBooks',
    async (shouldFail = false, { rejectWithValue }) => {
        const res = await fetchBooksApi(shouldFail);
        if (isApiOk(res)){
            return res.data;
        }
        return rejectWithValue(res.error);
    }
)

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        borrowBook: (state, action: PayloadAction<string>) => {
            const book = state.items.find((item) => item.id === action.payload);
            if (book && book.available > 0) {
                book.available -= 1;
                state.borrowedIds.push(book.id);
            }
        },
        returnBook: (state, action: PayloadAction<string>) => {
            const index = state.borrowedIds.indexOf(action.payload);
            if (index !== -1) {
                state.borrowedIds.splice(index, 1);
                const book = state.items.find((item) => item.id === action.payload);
                if (book) {
                    book.available += 1;
                }
            }
        },
        setWarning: (state, action: PayloadAction<string | null>) => {
            state.warning = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadBooks.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loadBooks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(loadBooks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
})

export const { borrowBook, returnBook, setWarning } = booksSlice.actions;
export default booksSlice.reducer;