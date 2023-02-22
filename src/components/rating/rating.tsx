import React, { ReactNode } from 'react';
import { ReactComponent as StarImg } from '../../assets/img/rating/Star.svg';
import './rating.scss';

export const Rating: React.FC<{ rating: number; isScore: boolean }> = ({ rating, isScore }): JSX.Element => {
  const fiveStar = Array(5).fill(false);

  const setStar = (classSvg: string, ind: number): ReactNode => <StarImg className={classSvg} key={`${ind + 1}`} />;

  return (
    <section className='rating'>
      <div className='rating__stars'>
        {rating
          ? fiveStar.map((_, index) => (index > rating ? setStar('nostar', index) : setStar('star', index)))
          : fiveStar.map((_, index) => setStar('nostar', index))}
      </div>
      {isScore ? (
        rating ? (
          <span className='scores'>{rating}</span>
        ) : (
          <span className='noscores'>ещё нет оценок</span>
        )
      ) : (
        ''
      )}
    </section>
  );
};
