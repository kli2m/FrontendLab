import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface NavState {
  isTile: boolean;
  isClickedSearch : boolean;
}

const initialState: NavState = {
  isTile: true,
  isClickedSearch:false,
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
    setIsSearch:(state, action:PayloadAction<boolean>) => {
      state.isClickedSearch = action.payload;
    },
  },
});

export const { setLayout, toggleLayout, setIsSearch } = navSlice.actions;

export const navReducer = navSlice.reducer;
