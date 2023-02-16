import React from 'react';

export const BookPage: React.FC<{ child: JSX.Element }> = ({ child }): JSX.Element => (
  <section className='book-page'>{child}</section>
);
