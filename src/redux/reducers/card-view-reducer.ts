import { createSlice } from '@reduxjs/toolkit';

export interface CardViewState {
  isOpenReviews: boolean;
}

const initialState: CardViewState = {
  isOpenReviews: true,
};

export const cardViewSlice = createSlice({
  name: 'card-view',
  initialState,
  reducers: {
    toggleOpenReviews: (state) => {
      state.isOpenReviews = !state.isOpenReviews;
    },
  },
});

export const { toggleOpenReviews } = cardViewSlice.actions;

export const cardViewReducer = cardViewSlice.reducer;
