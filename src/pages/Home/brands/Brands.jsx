import React from 'react';
import 'swiper/css';
import { Autoplay} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import amazon from '../../../assets/brands/amazon.png'
import casio from '../../../assets/brands/casio.png'
import monstar from '../../../assets/brands/moonstar.png'
import star from '../../../assets/brands/star.png'
import randstad from '../../../assets/brands/randstad.png'
import people from '../../../assets/brands/start_people.png'



const Brands = () => {


     const brandImg = [amazon,monstar,randstad,casio,people,star]


    return (
        <Swiper
            slidesPerView={4}
            centeredSlides={true}
            spaceBetween={20}
            grabCursor={true}
            loop={true}
            autoplay={
                {
                    delay:2000,
                    disableOnInteraction: false
                }
            }
            
            pagination={{
             clickable: true,
            }}
            modules={[Autoplay] }
            className="mySwiper mt-10"
        >
        {
            brandImg.map((logo, index) =>  <SwiperSlide key={index} > <img src={logo} alt="logoImg" /> </SwiperSlide>
                  
            )
        }
            
        
        </Swiper>
    );
};

export default Brands;