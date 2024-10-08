'use client'

import React, { useState } from 'react';
import { ProductImage } from '@/components';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';


// Import Swiper React components
import { Swiper as SwiperObject } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { useRouter } from 'next/navigation';


interface Props {
  images: string[];
  title: string;
  className?: string;
}


export const ProductSlideshow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();
  const router = useRouter();

  if (images.length === 0) {
    router.replace('/')
  }

  return (
    <div className={className}>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        } as React.CSSProperties}
        spaceBetween={10}
        navigation={true}
        autoplay={{ delay: 4000 }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {
          images.map((image) => (
            <SwiperSlide key={image}>
              <ProductImage
                priority
                src={image}
                alt={title}
                width={1024}
                height={800}
                className='rounded-xl object-fill'
              />
            </SwiperSlide>
          ))
        }
      </Swiper>

      {/* Parte 2 */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {
          images.map((image) => (
            <SwiperSlide key={image}>
              <ProductImage
                priority
                src={image}
                alt={title}
                width={300}
                height={300}
                className='rounded-xl object-fill'
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
}