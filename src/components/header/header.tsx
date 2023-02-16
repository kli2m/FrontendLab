import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import avatar from '../../assets/img/header/avatar.png';
import logo from '../../assets/img/header/logo.png';
import { toggleOpenMenu } from '../../redux/reducers/menu-reducer';
import { RootState } from '../../redux/redux-store';
import { Menu } from '../menu';

import './header.scss';

export const Header: React.FC = () => {
  const isMenuOpen = useSelector((state: RootState) => state.menu.isOpen);
  const dispatch = useDispatch();
  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleOpenMenu(event.target.checked));    
  };

  return (
    <section className='header'>
      {isMenuOpen && <Menu data-test-id='burger-navigation' isHeader={true} />}
      <div className='header__logo-box'>
      <img className='header__logo' src={logo} alt='logo' />
      <div data-test-id='button-burger' className={classNames('hamburger-menu', isMenuOpen ? 'open' : 'close')}>
        <input id='menu__toggle' type='checkbox' checked={isMenuOpen} onChange={onHandleChange} />
        <div className='menu__btn'> </div>
      </div>
      <span className='header__title'>Библиотека</span>
      </div>
      <div className='header__user-info'>
        <span>Привет, Иван!</span>
        <img src={avatar} alt='avatar' />
      </div>
    </section>
  );
};
