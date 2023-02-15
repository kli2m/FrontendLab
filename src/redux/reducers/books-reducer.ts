import { createAsyncThunk, createEntityAdapter, createSlice, SerializedError } from '@reduxjs/toolkit';
import axios from 'axios';

import { GET_ALL_BOOKS_API, GET_BOOK_BY_ID_API,GET_CATEGORIES_API } from '../../constants/api';
import { BookType2, CategoriesType, MutBooksType } from '../../interfaces/book';

export interface BooksState {
  status: string;
  entities: BookType2[];
  categories: CategoriesType[];
  mutEntities: MutBooksType[];
  error: SerializedError | null;
  book: BookType2 | null;
}

const initialState: BooksState = {
  status: 'idle',
  entities: [],
  categories: [],
  mutEntities: [],
  error: null,
  book: null,
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

const booksSlice = createSlice({
  name: 'books',
  initialState: booksAdapter.getInitialState(initialState),
  reducers: {
    setValueError: (state, action) => {
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
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.entities = action.payload;
        if (state.categories && state.entities) {
          state.mutEntities = state.categories.map((category) => ({
            ...category,
            books: state.entities.filter((book) => book.categories.some((cat) => cat === category.name)),
          }));

          if (state.mutEntities) {
            state.status = 'idle';
            state.error = null;
          } else{ state.error = new Error('Wrong data from api');
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
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.error = null;
        state.categories = action.payload;
        state.status = 'idle';
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
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.error = null;
        state.book = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.error = action.error;
        state.book = null;
        state.status = 'failed';
      });
  },
});

export const { setValueError } = booksSlice.actions;

export const booksReducer = booksSlice.reducer;
