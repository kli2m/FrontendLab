import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface NavState {
  isTile: boolean;
  isClickedSearch: boolean;
  inputValue: string;
  isDescending: boolean;
}

const initialState: NavState = {
  isTile: true,
  isClickedSearch: false,
  inputValue: '',
  isDescending: true,
};

export const navSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    toggleLayout: (state) => {
      state.isTile = !state.isTile;
    },
    toggleDescending: (state, action: PayloadAction<boolean>) => {
      state.isDescending = !action.payload;
    },
    setLayout: (state, action: PayloadAction<boolean>) => {
      state.isTile = action.payload;
    },
    setIsSearch: (state, action: PayloadAction<boolean>) => {
      state.isClickedSearch = action.payload;
    },
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    setFilterBooks: (state, action: PayloadAction<string>) => {},
  },
});

export const { setLayout, toggleLayout, setIsSearch, setInputValue, toggleDescending, setFilterBooks } =
  navSlice.actions;

export const navReducer = navSlice.reducer;
