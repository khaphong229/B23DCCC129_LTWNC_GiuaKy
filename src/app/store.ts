import booksReducer, { borrowBook, setWarning, type BooksState } from '../features/books/booksSlice';
import { configureStore, type Middleware } from '@reduxjs/toolkit';

export const borrowLimitMiddelware: Middleware<object, {books: BooksState}> = (store) => (next) => (action) => {
    if (borrowBook.match(action)){
        const state = store.getState();
        if (state.books.borrowedIds.length >= 3){
            store.dispatch(setWarning('Bạn chỉ được mượn tối đa 3 cuốn sách!'));
            return;
        }
    }
    return next(action);
}

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(borrowLimitMiddelware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;