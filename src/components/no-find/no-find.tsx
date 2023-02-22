import React from 'react';

import './no-find.scss';

export const NoFind: React.FC<{ text: string }> = ({ text }): JSX.Element => (
  <section className='no-find'>
    <div className='no-find__content'>{text}</div>
  </section>
);
