import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from '../../../assets/banner/banner1.png';
import bannerImg2 from '../../../assets/banner/banner2.png';
import bannerImg3 from '../../../assets/banner/banner3.png';

const Banner = () => {
    return (
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
            <Carousel 
                autoPlay={true} 
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                className="mt-2 md:mt-5 rounded-2xl overflow-hidden shadow-md"
            >
                <div className="h-[200px] sm:h-[350px] md:h-[450px] lg:h-[550px] w-full">
                    <img 
                        src={bannerImg1} 
                        alt="Banner 1" 
                        className="w-full h-full object-cover object-center" 
                    />
                </div>
                <div className="h-[200px] sm:h-[350px] md:h-[450px] lg:h-[550px] w-full">
                    <img 
                        src={bannerImg2} 
                        alt="Banner 2" 
                        className="w-full h-full object-cover object-center" 
                    />
                </div>
                <div className="h-[200px] sm:h-[350px] md:h-[450px] lg:h-[550px] w-full">
                    <img 
                        src={bannerImg3} 
                        alt="Banner 3" 
                        className="w-full h-full object-cover object-center" 
                    />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;