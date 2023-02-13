import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';

import noimg from '../../assets/img/card/noimg.png';
import { DETAIL } from '../../constants/detail';
import { MENU } from '../../constants/menu-bar';
import { toggleOpenReviews } from '../../redux/reducers/card-view-reducer';
import { RootState } from '../../redux/redux-store';
import { getDateBookedTill } from '../../utils';
import { Rating } from '../rating';
import { Slider } from '../slider';

import './card-view.scss';

export const CardView: React.FC = () => {
  const dispatch = useDispatch();

  const isOpenReviews = useSelector((state: RootState) => state.cardView.isOpenReviews);
  const classOpenReviews = isOpenReviews ? 'rev-open' : 'rev-close';
  const params = useParams();
  const { id, category } = params;

  const indexCategory = MENU.findIndex((catalog) => catalog.category === category);
  const indexBook = MENU[indexCategory].books.findIndex((book) => book.id === id);
  const thisBook = MENU[indexCategory].books[indexBook];

  const onHandleOpenReviews = () => {
    dispatch(toggleOpenReviews());
  };

  return (
    <section className='card-view'>
      <div className='card-view__path'>
        <NavLink to={`../books/${category}`}>
          {' '}
          {MENU[indexCategory].name} <span>/</span> {thisBook.title}
        </NavLink>
      </div>
      <div className='card-view__main'>
        <div className='card-view__main_img-block img-block'>
          {thisBook.image ? (
            thisBook.image.length > 1 ? (
              <Slider images={thisBook.image} />
            ) : (
              <img className='img-block__img' src={thisBook.image[0]} alt='img' />
            )
          ) : (
            <img className='img-block__img' src={noimg} alt='img' />
          )}
        </div>
        <div className='card-view__main_content'>
          <span className='card__title'>{thisBook.title}</span>
          <div className='card__author'>
            <span>{thisBook.author}, </span>
            <span>{thisBook.year}</span>
          </div>
          {thisBook.isBooked ? (
            <button type='button' className='card__btn free'>
              Забронировать
            </button>
          ) : (
            <button type='button' className='card__btn booked'>
              Занята до {getDateBookedTill(thisBook.bookedTill)}
            </button>
          )}
          <div className='description'>
            <span className='description__paragraph'>О книге</span>
            <span className='description__text'>{thisBook.title}</span>
          </div>
        </div>
      </div>
      <div className='card-view__addition'>
        <div className='card-view__addition_description description'>
          <span className='description__paragraph'>О книге</span>
          <span className='description__text'>{thisBook.title}</span>
        </div>
        <div className='card-view__addition_rating'>
          <span className='rating__title'>Рейтинг</span>
          <Rating rating={thisBook.rating} isScore={true} />
        </div>
        <div className='card-view__addition_info info'>
          <span className='info__title'>Подробная информация</span>
          <div className='info__detail'>
            {DETAIL.map((item, index) => (
              <div key={`${item} ${index + 1}`} className='info__detail_item item'>
                <span className='item__name'>{item.name}</span>
                <span className='item__value'>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='card-view__addition_reviews reviews'>
          <div className='reviews__title'>
            <span className='reviews__title_name'>Отзывы</span>
            <span className='reviews__title_count'>{thisBook.reviews.length}</span>
            <button
              className={classNames('reviews__title_btn', classOpenReviews)}
              type='button'
              onClick={onHandleOpenReviews}
              data-test-id='button-hide-reviews'
            >
              {' '}
            </button>
          </div>
          <div className='reviews__content'>
            <div className={classNames('reviews__content_items', classOpenReviews)}>
              {thisBook.reviews.map((rev, ind) => (
                <div key={`${ind + 1}`} className='review'>
                  <div className='review__main'>
                    <img className='review__main_img' src={rev.img} alt={rev.name} />
                    <div className='review__main_data'>
                      <span>{rev.name}</span>
                      <span>{rev.date}</span>
                    </div>
                  </div>
                  <div className='review__rating'>
                    <Rating rating={rev.personalRating} isScore={false} />
                  </div>
                  <div className='review__comment'>{rev.comment}</div>
                </div>
              ))}
            </div>
            <button data-test-id='button-rating' className='reviews__content_btn' type='button'>
              оценить книгу
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
