import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ThunkDispatch } from '@reduxjs/toolkit';

import { Card } from '../../components/card/card';
import { Menu } from '../../components/menu';
import { Navigation } from '../../components/navigation';
import { NoFind } from '../../components/no-find';
import { fetchBooks } from '../../redux/reducers/books-reducer';
import { RootState } from '../../redux/redux-store';

import './main-page.scss';

export const MainPage: React.FC = () => {
  const isOpenMenu = useSelector((state: RootState) => state.menu.isOpen);
  const filterBooks = useSelector((state: RootState) => state.books.filterBooks);
  const categories = useSelector((state: RootState) => state.books.categories);
  const inputValue = useSelector((state: RootState) => state.nav.inputValue);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(fetchBooks()); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <NoFind isFilter={true} />
            ) : (
              <NoFind isFilter={false} />
            )
          ) : filterBooks.length > 0 ? (
            filterBooks.map((book) => <Card key={`${book.id}`} currentCategory='all' book={book} />)
          ) : (
            <NoFind isFilter={true} />
          )}
        </section>
      </div>
    </React.Fragment>
  );
};
