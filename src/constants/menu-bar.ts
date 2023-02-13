import { MenuType } from '../interfaces/book';

import { BOOKS } from './books';

export const MENU: MenuType[] = [
  { category: 'business', name: 'Бизнес-книги', count: BOOKS.business.length, books: BOOKS.business },
  { category: 'detective', name: 'Детективы', count: BOOKS.detective.length, books: BOOKS.detective },
  { category: 'children', name: 'Детские книги', count: BOOKS.children.length, books: BOOKS.children },
  { category: 'foreign', name: 'Зарубежная литература', count: BOOKS.foreign.length, books: BOOKS.foreign },
  { category: 'history', name: 'История', count: BOOKS.history.length, books: BOOKS.history },
  { category: 'classic', name: 'Классическая литература', count: BOOKS.classic.length, books: BOOKS.classic },
  { category: 'psychology', name: 'Книги по психологии', count: BOOKS.psychology.length, books: BOOKS.psychology },
  { category: 'computers', name: 'Компьютерная литература', count: BOOKS.computers.length, books: BOOKS.computers },
  { category: 'culture', name: 'Культура и искусство', count: BOOKS.culture.length, books: BOOKS.culture },
  { category: 'science', name: 'Наука и образование', count: BOOKS.science.length, books: BOOKS.science },
  {
    category: 'publicistic',
    name: 'Публицистическая литература',
    count: BOOKS.publicistic.length,
    books: BOOKS.publicistic,
  },
  { category: 'references', name: 'Справочники', count: BOOKS.references.length, books: BOOKS.references },
  { category: 'scifi', name: 'Фантастика', count: BOOKS.scifi.length, books: BOOKS.scifi },
  { category: 'humor', name: 'Юмористическая литература', count: BOOKS.humor.length, books: BOOKS.humor },
];
