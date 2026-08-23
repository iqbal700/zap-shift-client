import React, { use } from 'react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import ReviewCard from './ReviewCard';

const Reviews = ({ reviewPromise }) => {
  const reviews = use(reviewPromise);

  return (
    <section className="text-center mt-12 md:mt-20 max-w-7xl mx-auto px-4">
      {/* Header Section */}
      <div className="mb-8 md:mb-12 max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-3 text-secondary">
          What Our Clients Say
        </h2>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          Discover how our fast and reliable parcel delivery service helps individuals and businesses stay connected every day.
        </p>
      </div>

      {/* Swiper Slider */}
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        // Responsive Breakpoints
        breakpoints={{
          // Mobile (0px and above)
          0: {
            slidesPerView: 1.2,
            coverflowEffect: {
              rotate: 30,
              stretch: 0,
              depth: 60,
              modifier: 1,
              slideShadows: false,
            },
          },
          // Tablet (640px and above)
          640: {
            slidesPerView: 2,
            coverflowEffect: {
              rotate: 40,
              stretch: 0,
              depth: 80,
              modifier: 1,
              slideShadows: true,
            },
          },
          // Desktop (1024px and above)
          1024: {
            slidesPerView: 3,
            coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            },
          },
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper py-6"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Reviews;