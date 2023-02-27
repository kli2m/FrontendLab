import React from 'react';

import './no-find.scss';

export const NoFind: React.FC<{ isFilter: boolean }> = ({ isFilter = false }): JSX.Element => (
  <section className='no-find'>
    <div className='no-find__content' data-test-id={isFilter ? 'search-result-not-found' : 'empty-category'}>
      {isFilter ? 'По запросу ничего не найдено' : 'В этой категории книг ещё нет'}
    </div>
  </section>
);
