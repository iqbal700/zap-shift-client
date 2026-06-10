import React from 'react';
import bookingICon from '../../../assets/bookingIcon.png'

const Services = () => {

    const worksArray = [1,2,3,4,5,6]
    return (
        <div className='mt-15 rounded-4xl p-10 bg-[#03373D] '>
            <div className='text-white flex p-10 flex-col items-center'>
                    <h1>Our services</h1>
                    <p className='w-190'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
             <div className='flex flex-wrap justify-center gap-6 p-4'> 
                {
                    worksArray.map((works, index) => (
                        <div 
                            key={index} 
                            className='w-full md:w-[30%] lg:w-[31%] h-60 rounded-2xl flex flex-col gap-2 p-5 bg-gray-100'
                        >
                            <img className='w-15' src={bookingICon} alt="bookingIcon" />
                            <h1 className='font-bold text-secondary'>Booking Pick & Drop</h1>
                            <p>From personal packages to business shipments we deliver on time, every Time</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Services;