import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface MenuState {
  isOpen: boolean;
  isOpenBooks: boolean;
}

const initialState: MenuState = {
  isOpenBooks: true,
  isOpen: false,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleOpenBooks: (state) => {
      state.isOpenBooks = !state.isOpenBooks;
    },
    setIsOpenBooks: (state, action: PayloadAction<boolean>) => {
      state.isOpenBooks = action.payload;
    },
    toggleOpenMenu: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { toggleOpenMenu, toggleOpenBooks, setIsOpenBooks } = menuSlice.actions;

export const menuReducer = menuSlice.reducer;
