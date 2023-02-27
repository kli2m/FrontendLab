import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import noimg from '../../assets/img/card/noimg.png';
import { BookType } from '../../interfaces/book';
import { RootState } from '../../redux/redux-store';
import { getDateBookedTill, getPathImage } from '../../utils';
import { Rating } from '../rating';

import './card.scss';

const Hightlight = (str: string, filter: string): string | any => {
  if (!filter) return str;
  const regexp = new RegExp(filter, 'ig');
  const matchValue = str.match(regexp);

  if (matchValue) {
    return str.split(regexp).map((s, index, array) => {
      if (index < array.length - 1) {
        const c = matchValue.shift();

        return (
          <React.Fragment key={`${s} ${index + 1}`}>
            {s}
            <span  className='hightlight' data-test-id='highlight-matches'>
              {c}
            </span>
          </React.Fragment>
        );
      }

      return s;
    });
  }

  return str;
};

export const Card: React.FC<{ book: BookType; currentCategory: string }> = (props) => {
  const isTile = useSelector((state: RootState) => state.nav.isTile);
  const inputValue = useSelector((state: RootState) => state.nav.inputValue);

  const { book, currentCategory } = props;

  const onHandleBook = () => {};

  return (
    <section data-test-id='card' className={`card ${isTile ? 'tile' : 'list'}`}>
      <NavLink to={`/books/${currentCategory}/${book.id}`}>
        {book.image ? (
          <img className='card__img' src={getPathImage(book.image.url)} loading='lazy' alt='img' />
        ) : (
          <img className='card__img' src={noimg} alt='img' />
        )}
      </NavLink>

      <div className='content'>
        <div className='card__rating'>
          <Rating rating={book.rating} isScore={false} />
        </div>
        <div className='description'>
          <span className='card__title'>{Hightlight(book.title, inputValue)}</span>
          <span className='card__author'>
            {book.authors}, {book.issueYear}
          </span>
        </div>
        {book.booking ? (
          <button type='button' className='card__btn booked'>
            Занята до {getDateBookedTill(book.booking.dateOrder)}
          </button>
        ) : (
          <button type='button' className='card__btn free' onClick={onHandleBook}>
            Забронировать
          </button>
        )}
      </div>
    </section>
  );
};
