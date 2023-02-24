import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction,SerializedError } from '@reduxjs/toolkit';
import axios from 'axios';

import { GET_ALL_BOOKS_API, GET_BOOK_BY_ID_API, GET_CATEGORIES_API } from '../../constants/api';
import { BookType, CategoriesType, MutBooksType } from '../../interfaces/book';
import { getFixString } from '../../utils';

import { navSlice } from './navigation-reducer';

export interface BooksState {
  status: string;
  booksArray: BookType[];
  categories: CategoriesType[];
  mutEntities: MutBooksType[];
  error: SerializedError | null;
  book: BookType | null;
  filterBooks: BookType[];
}

const initialState: BooksState = {
  status: 'idle',
  booksArray: [],
  categories: [],
  mutEntities: [],
  error: null,
  book: null,
  filterBooks: [],
};

export const fetchBooks = createAsyncThunk('books', async () => {
  const resBooks = await axios.get(GET_ALL_BOOKS_API);

  return resBooks.data;
});

export const fetchCategories = createAsyncThunk('categories', async () => {
  const resCategories = await axios.get(GET_CATEGORIES_API);

  return resCategories.data;
});

export const fetchBookById = createAsyncThunk('book', async (id: string) => {
  const resBookById = await axios.get(`${GET_BOOK_BY_ID_API}${id}`);

  return resBookById.data;
});

const booksAdapter = createEntityAdapter();

export const booksSlice = createSlice({
  name: 'books',
  initialState: booksAdapter.getInitialState(initialState),
  reducers: {
    setValueError: (state, action: PayloadAction<SerializedError | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.mutEntities = [];
        state.categories = [];
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<BookType[]>) => {
        const tempArrBooks = action.payload;

        tempArrBooks.sort((a, b) => b.rating - a.rating);

        state.booksArray = tempArrBooks;
        state.filterBooks = tempArrBooks;

        if (state.categories && state.booksArray) {
          state.mutEntities = state.categories.map((category) => ({
            ...category,
            books: state.booksArray.filter((book) => book.categories.some((cat) => cat === category.name)),
          }));

          if (state.mutEntities) {
            state.status = 'idle';
            state.error = null;
          } else {
            state.error = new Error('Wrong data from api');
            state.status = 'idle';
          }
        } else {
          state.status = 'idle';

          state.error = new Error('Wrong data from api');
        }
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.mutEntities = [];
        state.categories = [];
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.categories = [];
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<CategoriesType[]>) => {
        state.error = null;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.error;
        state.categories = [];
        state.status = 'failed';
      })
      .addCase(fetchBookById.pending, (state) => {
        state.error = null;
        state.book = null;
        state.status = 'loading';
      })
      .addCase(fetchBookById.fulfilled, (state, action: PayloadAction<BookType>) => {
        state.error = null;
        state.book = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.error = action.error;
        state.book = null;
        state.status = 'failed';
      })
      .addCase(navSlice.actions.toggleDescending, (state, action: PayloadAction<boolean>) => {
        if (action.payload) {
          state.booksArray.sort((a, b) => a.rating - b.rating);
          state.filterBooks.sort((a, b) => a.rating - b.rating);
        } else {
          state.filterBooks.sort((a, b) => b.rating - a.rating);
          state.booksArray.sort((a, b) => b.rating - a.rating);
        }
      })
      .addCase(navSlice.actions.setFilterBooks, (state, action: PayloadAction<string>) => {
        state.filterBooks = state.booksArray.filter((book) =>
          getFixString(book.title).indexOf(getFixString(action.payload)) === -1 ? false : true
        );
      });
  },
});

export const { setValueError } = booksSlice.actions;

export const booksReducer = booksSlice.reducer;
