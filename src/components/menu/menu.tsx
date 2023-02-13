import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { MENU } from '../../constants/menu-bar';
import { ROUTES_NAMES } from '../../constants/routes';
import { setIsOpenBooks, toggleOpenBooks, toggleOpenMenu } from '../../redux/reducers/menu-reducer';
import { RootState } from '../../redux/redux-store';

import './menu.scss';

export const Menu: React.FC<{ isHeader?: boolean }> = ({ isHeader = false }) => {
  const isOpenBooksMenu = useSelector((state: RootState) => state.menu.isOpenBooks);
  const isOpenMenu = useSelector((state: RootState) => state.menu.isOpen);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const { all, category } = params;

  const classIsHeader = isHeader ? 'menu-header-active' : 'menu-header-noactive';
  const classOpenBooksMenu = isOpenBooksMenu ? 'visible' : 'hide';
  const classMenuActive = all || category ? 'active' : 'noactive';

  const classOpenMenu = isOpenMenu ? 'open-menu' : 'hide-menu';

  const onHandleToggleHide = () => {
    dispatch(toggleOpenBooks());
    navigate(`${ROUTES_NAMES.ALL_BOOKS}`);
  };

  const onHandleClickMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const onHandleCloseMenu = () => {
    if (isOpenMenu) dispatch(toggleOpenMenu(false));
  };

  const onHandleClickOther = () => {
    dispatch(setIsOpenBooks(false));
  };

  return (
    <section
      role='button'
      onKeyPress={() => {}}
      tabIndex={0}
      onClick={onHandleClickMenu}
      className={classNames('menu', classNames(classOpenMenu), classIsHeader)}
    >
      <div className='menu__books'>
        <NavLink
          to={ROUTES_NAMES.ALL_BOOKS}
          data-test-id={classNames(isOpenMenu ? 'burger-showcase' : 'navigation-showcase')}
          type='button'
          className={({ isActive }) => classNames('menu__books_title', classMenuActive, isActive && 'active')}
          onClick={onHandleToggleHide}
        >
          Витрина книг
          <div className={classNames(classMenuActive, classOpenBooksMenu)}> </div>
        </NavLink>

        <ul className={`books-list ${classOpenBooksMenu}`}>
          <NavLink
            to={ROUTES_NAMES.ALL_BOOKS}
            className={({ isActive }) => (isActive ? 'active books-list__title' : 'books-list__title')}
            onClick={onHandleCloseMenu}
            data-test-id={classNames(isOpenMenu ? 'burger-books' : 'navigation-books')}
          >
            Все книги
          </NavLink>
          {MENU.map((book, ind) => (
            <li key={`${book.category} ${ind + 1}`} className='books-list__item'>
              <NavLink onClick={onHandleCloseMenu} to={`/books/${book.category}`} className='books-list__item_link'>
                <span>{book.name}</span>
              </NavLink>
              <span className='books-list__item_count'>{book.count}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={classNames('menu__other', classOpenBooksMenu)}>
        <NavLink
          onClick={onHandleClickOther}
          to='/rules'
          className={({ isActive }) => (isActive ? 'menu__other_rules active' : 'menu__other_rules')}
          data-test-id={classNames(isOpenMenu ? 'burger-terms' : 'navigation-terms')}
        >
          Правила пользования
        </NavLink>
        <NavLink
          onClick={onHandleClickOther}
          to='/offer'
          className={({ isActive }) => (isActive ? 'menu__other_offer active' : 'menu__other_offer')}
          data-test-id={classNames(isOpenMenu ? 'burger-contract' : 'navigation-contract')}
        >
          Договор оферты
        </NavLink>
      </div>
      <div className={classNames('menu__profile-block', classOpenBooksMenu)}>
        <div className='profile'>
          <NavLink
            onClick={onHandleClickOther}
            to='/rules'
            className={({ isActive }) => (isActive ? 'profile__data active' : 'profile__data')}
          >
            Профиль
          </NavLink>
          <NavLink
            onClick={onHandleClickOther}
            to='/rules'
            className={({ isActive }) => (isActive ? 'profile__exit active' : 'profile__exit')}
          >
            Выход
          </NavLink>
        </div>
      </div>
    </section>
  );
};
