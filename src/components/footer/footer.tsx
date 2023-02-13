import React from 'react';

import { SOCIAL } from '../../constants/social';

import './footer.scss';

export const Footer: React.FC = () => (
  <section className='footer'>
    <span className='footer__copy'>&copy; 2020-2023 Cleverland. Все права защищены.</span>
    <div className='footer__social'>
      {SOCIAL.map((social, ind) => (
        <a key={`${social.name} ${ind + 1}`} className='footer__social_link ' href={social.link}>
          <img className='link-img' src={social.img} alt={social.name} />
        </a>
      ))}
    </div>
  </section>
);
