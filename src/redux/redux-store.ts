import { configureStore } from '@reduxjs/toolkit';

import { booksReducer } from './reducers/books-reducer';
import { cardViewReducer } from './reducers/card-view-reducer';
import { menuReducer } from './reducers/menu-reducer';
import { navReducer } from './reducers/navigation-reducer';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    nav: navReducer,
    cardView: cardViewReducer,
    books: booksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
