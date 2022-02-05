/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import AwesomeSwiper from 'react-awesome-swiper';
import logofile from '../../util/logo'
export default function LogoSlide() {
  const config = {
    loop : true,
    autoplay: {
      delay: 1000,
      stopOnLastSlide: false,
      disableOnInteraction: true,
    },
    // Disable preloading of all images
    preloadImages: false,
    // Enable lazy loading
    lazy: true,
    slidesPerView: 2,
    spaceBetween: 1,
    breakpoints: {
        280: {
          slidesPerView: 5,
          spaceBetween: 10,
        },
        360: {
          slidesPerView: 5,
          spaceBetween: 10,
        },
        390: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        414: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 8,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 7,
          spaceBetween: 10,
        },
        820: {
          slidesPerView: 7,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 12,
          spaceBetween: 10,
        },
      }
  };
  return(
    <div style={{marginBottom: '50px', marginTop: '10px'}}>
      <AwesomeSwiper config={config} className="mt-12">
        <div className="swiper-wrapper" >
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
              <div key={i} className="swiper-slide" style={{width: '30% !important'}}>
                  <img src={logofile[i]} style={{width: '100%', borderRadius: '10px'}} />
              </div>
            ))
          }
        </div>
      </AwesomeSwiper>
    </div>
  )
}