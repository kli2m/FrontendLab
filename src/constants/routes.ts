import { CardView } from '../components/card-view';
import { Router } from '../interfaces/router';
import { MainPage } from '../pages/main';
import { Offer } from '../pages/offer';
import { Rules } from '../pages/rules';
import { WrongPage } from '../pages/wrong-pages';

export const ROUTES_NAMES = {
  MAIN_PAGE: '/books',
  ALL_BOOKS: '/books/all',
  ALL_BOOKS_CARD: '/books/all/:id',
  RULES: '/rules',
  OFFER: '/offer',
  PROFILE: '/PROFILE',
  LOGOUT: '/LOGOUT',
  CATEGORY: '/books/:category',
  CARD: '/books/:category/:id',
  OTHER: '/*',
};

export const PUBLIC_ROUTES: Router[] = [
  {
    path: ROUTES_NAMES.MAIN_PAGE,
    component: MainPage,
    exact: true,
  },
  {
    path: ROUTES_NAMES.ALL_BOOKS,
    component: MainPage,
    exact: true,
  },
  {
    path: ROUTES_NAMES.CATEGORY,
    component: MainPage,
    exact: true,
  },
  {
    path: ROUTES_NAMES.ALL_BOOKS_CARD,
    component: CardView,
    exact: true,
  },
  {
    path: ROUTES_NAMES.CARD,
    component: CardView,
    exact: true,
  },
  {
    path: ROUTES_NAMES.RULES,
    component: Rules,
    exact: true,
  },
  {
    path: ROUTES_NAMES.OFFER,
    component: Offer,
    exact: true,
  },
  {
    path: ROUTES_NAMES.PROFILE,
    component: MainPage,
    exact: true,
  },
  {
    path: ROUTES_NAMES.LOGOUT,
    component: MainPage,
    exact: true,
  },
  {
    path: ROUTES_NAMES.OTHER,
    component: WrongPage,
    exact: false,
  },
];
