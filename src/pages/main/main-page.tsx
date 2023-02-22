import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Card } from '../../components/card/card';
import { Menu } from '../../components/menu';
import { Navigation } from '../../components/navigation';
import { NoFind } from '../../components/no-find';
import { RootState } from '../../redux/redux-store';

import './main-page.scss';

export const MainPage: React.FC = () => {
  const isOpenMenu = useSelector((state: RootState) => state.menu.isOpen);
  const filterBooks = useSelector((state: RootState) => state.books.filterBooks);
  const categories = useSelector((state: RootState) => state.books.categories);
  const inputValue = useSelector((state: RootState) => state.nav.inputValue);

  const params = useParams();
  const { category } = params;

  const filterEntities = filterBooks.filter((book) =>
    book.categories.some((catBook) => catBook === categories.find((cat) => cat.path === category)?.name)
  );

  return (
    <React.Fragment>
      {!isOpenMenu && <Menu />}
      <div className='wrapper-page__content_view'>
        <Navigation />
        <section className='main-page'>
          {category ? (
            filterEntities.length > 0 ? (
              filterEntities.map((book) => <Card key={`${book.id}`} currentCategory={category} book={book} />)
            ) : inputValue ? (
              <NoFind text='По запросу ничего не найдено' />
            ) : (
              <NoFind text='В этой категории книг ещё нет' />
            )
          ) : filterBooks.length > 0 ? (
            filterBooks.map((book) => <Card key={`${book.id}`} currentCategory='all' book={book} />)
          ) : (
            <NoFind text='По запросу ничего не найдено' />
          )}
        </section>
      </div>
    </React.Fragment>
  );
};
