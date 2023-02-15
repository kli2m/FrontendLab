import React, { Fragment, ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import classNames from 'classnames';

import { Footer } from '../../components/footer';
import { Header } from '../../components/header/header';
import { Loader } from '../../components/loader';
import { Message } from '../../components/message';
import { fetchBooks, fetchCategories } from '../../redux/reducers/books-reducer';
import { toggleOpenMenu } from '../../redux/reducers/menu-reducer';
import { RootState } from '../../redux/redux-store';

import './wrapper-page.scss';

export const WrapperPage: React.FC<{ child: ReactNode }> = ({ child }): JSX.Element => {
  const isMenuOpen = useSelector((state: RootState) => state.menu.isOpen);
  const status = useSelector((state: RootState) => state.books.status);
  const error = useSelector((state: RootState) => state.books.error);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(fetchCategories());
    if (error === null) dispatch(fetchBooks()); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHandleWrapper = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isMenuOpen) dispatch(toggleOpenMenu(false));
  };

  return (
    <Fragment>
      <Loader />
      <section
        role='button'
        onKeyPress={() => {}}
        tabIndex={0}
        className={classNames('wrapper-page', status)}
        onClick={onHandleWrapper}
      >
        <Header />
        <div className='wrapper-page__content'>
          <Message />
          {child}
        </div>
        <Footer />
      </section>
    </Fragment>
  );
};
