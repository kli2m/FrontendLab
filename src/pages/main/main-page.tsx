import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Card } from '../../components/card/card';
import { Menu } from '../../components/menu';
import { Navigation } from '../../components/navigation';
import { MENU } from '../../constants/menu-bar';
import { RootState } from '../../redux/redux-store';

import './main-page.scss';

export const MainPage: React.FC = () => {
  const isOpenMenu = useSelector((state: RootState) => state.menu.isOpen);
  const params = useParams();
  const { category } = params;

  return (
    <React.Fragment>
        {!isOpenMenu && <Menu />}
      <div className='wrapper-page__content_view'>
        <Navigation />
        <section className='main-page'>
          {category
            ? MENU.find((cat) => cat.category === category)?.books.map((book) => (
                <Card key={`${book.id}`} book={book} />
              ))
            : MENU.map((menu) => menu.books.map((book) => <Card key={`${book.id}`} book={book} />))}
        </section>
      </div>
    </React.Fragment>
  );
};
