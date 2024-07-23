'use client'

import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';


interface Props {
  images: string[];
  title: string;
  className?: string;
}


export const ProductMobileSlideshow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          width: '100%',
          maxHeight: '500px',
          marginBottom: '16px',
        }}
        pagination={true}
        autoplay={{ delay: 4000 }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="mySwiper2"
      >
        {
          images.map((image) => (
            <SwiperSlide key={image}>
              <Image
                priority
                src={`/products/${image}`}
                alt={title}
                width={500}
                height={600}
                className='object-fill rounded-md'
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
}