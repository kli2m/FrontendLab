import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface NavState {
  isTile: boolean;
  isClickedSearch: boolean;
  isAscending: boolean;
  inputValue: string;
}

const initialState: NavState = {
  isTile: true,
  isClickedSearch: false,
  isAscending: true,
  inputValue: '',
};

export const navSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    toggleLayout: (state) => {
      state.isTile = !state.isTile;
    },
    setLayout: (state, action: PayloadAction<boolean>) => {
      state.isTile = action.payload;
    },
    setIsSearch: (state, action: PayloadAction<boolean>) => {
      state.isClickedSearch = action.payload;
    },
    toggleAscending: (state) => {
      state.isAscending = !state.isAscending;
    },
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
  },
});

export const { setLayout, toggleLayout, setIsSearch, setInputValue } = navSlice.actions;

export const navReducer = navSlice.reducer;
