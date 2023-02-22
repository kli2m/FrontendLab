import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { ReactComponent as ListSVG } from '../../assets/img/navigation/list.svg';
import { ReactComponent as RatingSVG } from '../../assets/img/navigation/rating.svg';
import { ReactComponent as TileSVG } from '../../assets/img/navigation/tile.svg';
import { setFilterBooks } from '../../redux/reducers/books-reducer';
import { setInputValue, setIsSearch, setLayout } from '../../redux/reducers/navigation-reducer';
import { RootState } from '../../redux/redux-store';

import './navigation.scss';

export const Navigation: React.FC = () => {
  const isTile = useSelector((state: RootState) => state.nav.isTile);
  const isClickedSearch = useSelector((state: RootState) => state.nav.isClickedSearch);
  const inputValue = useSelector((state: RootState) => state.nav.inputValue);

  const classClickedSearch = isClickedSearch ? 'search_active' : 'search_noactive';
  const dispatch = useDispatch();

  const onHandleInput = (inp: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue(inp.target.value));
    dispatch(setFilterBooks(inp.target.value));
  };

  const onHandleTile = () => {
    dispatch(setLayout(true));
  };
  const onHandleList = () => {
    dispatch(setLayout(false));
  };

  const onHandleSearch = () => {
    dispatch(setIsSearch(true));
  };
  const onHandleCloseSearch = () => {
    dispatch(setIsSearch(false));
  };

  return (
    <section className='navigation'>
      <div className={classNames('navigation__split', classClickedSearch)}>
        <div className={classNames('navigation__search', classClickedSearch)}>
          <input
            className={classNames('navigation__search_input', classClickedSearch)}
            type='search'
            name='search'
            autoComplete='off'
            placeholder='Поиск книги или автора…'
            data-test-id='input-search'
            onChange={onHandleInput}
            value={inputValue}
          />
          <button
            data-test-id='button-search-open'
            className={classNames('navigation__search_btn', classClickedSearch)}
            type='button'
            onClick={onHandleSearch}
          >
            {' '}
          </button>
          <button
            data-test-id='button-search-close'
            className={classNames('navigation__search_close', classClickedSearch)}
            type='button'
            onClick={onHandleCloseSearch}
          >
            {' '}
          </button>
        </div>
        <div className={classNames('navigation__rating', classClickedSearch)}>
          <span>По рейтингу</span>
          <RatingSVG className='navigation__rating_img' />
        </div>
      </div>
      <div className={classNames('navigation__split', classClickedSearch)}>
        <button
          data-test-id='button-menu-view-window'
          type='button'
          className={classNames('navigation__loc-tile', isTile && 'active', classClickedSearch)}
          onClick={onHandleTile}
        >
          <TileSVG className='navigation__loc-tile_img' />
        </button>
        <button
          data-test-id='button-menu-view-list'
          type='button'
          className={classNames('navigation__loc-list', !isTile && 'active', classClickedSearch)}
          onClick={onHandleList}
        >
          <ListSVG className='navigation__loc-list_img' />
        </button>
      </div>
    </section>
  );
};
