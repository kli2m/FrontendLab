import React, { ReactNode } from 'react';
import { useDispatch,useSelector } from 'react-redux';

import { Footer } from '../../components/footer';
import { Header } from '../../components/header/header';
import { toggleOpenMenu } from '../../redux/reducers/menu-reducer';
import { RootState } from '../../redux/redux-store';

import './wrapper-page.scss';

export const WrapperPage: React.FC<{ child: ReactNode }> = ({ child }): JSX.Element => {
  const isMenuOpen = useSelector((state: RootState) => state.menu.isOpen);
  const dispatch = useDispatch();
  const onHandleWrapper = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isMenuOpen) dispatch(toggleOpenMenu(false));
  };

  return (
    <section role='button' onKeyPress={() => {}} tabIndex={0} className='wrapper-page' onClick={onHandleWrapper}>
      <Header />
      <div className='wrapper-page__content'>{child}</div>
      <Footer />
    </section>
  );
};
