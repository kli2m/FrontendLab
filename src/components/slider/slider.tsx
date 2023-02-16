import React, { useState } from 'react';
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ImageType } from '../../interfaces/book';
import { getPathImage } from '../../utils';

import './slider.scss';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

export const Slider: React.FC<{ images: ImageType[] }> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <React.Fragment>
      <Swiper
        loop={true}
        freeMode={true}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Pagination, Thumbs]}
        className='slider'
        data-test-id='slide-big'
        pagination={true}
        breakpoints={{
          320: {
            pagination: {
              type: 'bullets',
              clickable: true,
            },
          },
          769: {
            pagination: false,
          },
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide data-test-id='slide-mini' className='slider__slide' key={`${img.url} ${index + 1}`}>
            <img src={getPathImage(img.url)} alt={`img_${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={30}
        slidesPerView={5}
        freeMode={true}
        loop={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs, Navigation]}
        className='thumbnails'
      >
        <span className='thumbnails__pagination'>
          {images.map((img, index) => (
            <SwiperSlide data-test-id='slide-mini' className='thumbnails__slide' key={`${img.url} ${index + 1}`}>
              <img src={getPathImage(img.url)} alt={`img_${index}`} />
            </SwiperSlide>
          ))}
        </span>
      </Swiper>
    </React.Fragment>
  );
};
