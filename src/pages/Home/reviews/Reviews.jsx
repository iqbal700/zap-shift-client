import React, { use } from 'react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import ReviewCard from './ReviewCard';



const Reviews = ({reviewPromise}) => {

    const reviews = use(reviewPromise);
    console.log(reviews);

    return (

       <div className='text-center mt-15'>
           <div className='mb-15'>
               <h3 className="text-3xl text-centre">Reviews</h3>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut repudiandae voluptas explicabo enim vero quo neque necessitatibus aspernatur deleniti iste, nobis totam voluptatem ipsa obcaecati error, odit ducimus magni reprehenderit!</p>
           </div>

            <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >

       {
        reviews.map((review, index) =>
            <SwiperSlide key={index}>
               <ReviewCard review={review} > </ReviewCard>
            </SwiperSlide> )
       }

      </Swiper>
    </>

       </div>

       
    
          
    );
};

export default Reviews;