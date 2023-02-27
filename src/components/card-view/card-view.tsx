import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { ThunkDispatch } from '@reduxjs/toolkit';
import classNames from 'classnames';

import noimg from '../../assets/img/card/noimg.png';
import { DETAIL } from '../../constants/detail';
import { fetchBookById } from '../../redux/reducers/books-reducer';
import { toggleOpenReviews } from '../../redux/reducers/card-view-reducer';
import { RootState } from '../../redux/redux-store';
import { getDateBookedTill, getPathImage } from '../../utils';
import { getDateReview } from '../../utils/get-date-review';
import { Message } from '../message';
import { Rating } from '../rating';
import { Slider } from '../slider';

import './card-view.scss';

export const CardView: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const isOpenReviews = useSelector((state: RootState) => state.cardView.isOpenReviews);

  const thisBook = useSelector((state: RootState) => state.books.book);

  const mutEntities = useSelector((state: RootState) => state.books.mutEntities);

  const location = useLocation();

  const currLoc = location.pathname.split('/')[2];

  const currentCategory = mutEntities.find((categ) => categ.path === currLoc);

  const classOpenReviews = isOpenReviews ? 'rev-open' : 'rev-close';

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) dispatch(fetchBookById(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHandleOpenReviews = () => {
    dispatch(toggleOpenReviews());
  };

  return (
    <section className='card-view'>
      {thisBook ? (
        <Fragment>
          <div className='card-view__path'>
            <NavLink data-test-id='breadcrumbs-link' to={`../books/${currentCategory?.path}`}>
              {currentCategory?.name}
            </NavLink>
            <span>/</span>
            <span data-test-id='book-name'>{thisBook.title}</span>
          </div>
          <div className='card-view__main'>
            <div className='card-view__main_img-block img-block'>
              {thisBook.images && thisBook.images?.length > 1 ? (
                <Slider images={thisBook.images} />
              ) : thisBook.image ? (
                <img className='img-block__img' src={getPathImage(thisBook.image.url)} loading='lazy' alt='img' />
              ) : thisBook.images ? (
                <img className='img-block__img' src={getPathImage(thisBook.images[0].url)} loading='lazy' alt='img' />
              ) : (
                <img className='img-block__img' src={noimg} alt='img' />
              )}
            </div>
            <div className='card-view__main_content'>
              <span data-test-id='book-title' className='card__title'>
                {thisBook.title}
              </span>
              <div className='card__author'>
                <span>{thisBook.authors}</span>
              </div>
              {thisBook.booking ? (
                <button type='button' className='card__btn booked'>
                  Занята до {getDateBookedTill(thisBook.booking.dateOrder)}
                </button>
              ) : (
                <button type='button' className='card__btn free'>
                  Забронировать
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
                {DETAIL.map((item, index) =>
                  Object.entries(thisBook).map(
                    (val) =>
                      val[0] === item.equal && (
                        <div key={`${item} ${index + 1}`} className='info__detail_item item'>
                          <span className='item__name'>{item.name}</span>
                          <span className='item__value'>{val[1] ? val[1] : '-'}</span>
                        </div>
                      )
                  )
                )}
              </div>
            </div>
            <div className='card-view__addition_reviews reviews'>
              <div className='reviews__title'>
                <span className='reviews__title_name'>Отзывы</span>
                <span className='reviews__title_count'>{thisBook.comments && thisBook.comments.length}</span>
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
                  {thisBook.comments &&
                    thisBook.comments.map((rev, ind) => (
                      <div key={`${ind + 1}`} className='review'>
                        <div className='review__main'>
                          <img
                            className='review__main_img'
                            src={rev.user.avatarUrl && getPathImage(rev.user.avatarUrl)}
                            loading='lazy'
                            alt='avatarImg'
                          />
                          <div className='review__main_data'>
                            <span>
                              {rev.user.firstName} {rev.user.lastName}
                            </span>
                            <span>{getDateReview(rev.createdAt)}</span>
                          </div>
                        </div>
                        <div className='review__rating'>
                          <Rating rating={rev.rating} isScore={false} />
                        </div>
                        <div className='review__comment'>{rev.text}</div>
                      </div>
                    ))}
                </div>
                <button data-test-id='button-rating' className='reviews__content_btn' type='button'>
                  оценить книгу
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <Message msg='Ошибка открытия карточки книги' />
      )}
    </section>
  );
};
