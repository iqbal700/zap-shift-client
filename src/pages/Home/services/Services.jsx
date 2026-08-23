import React from 'react';
import bookingICon from '../../../assets/bookingIcon.png';

const Services = () => {
    const worksArray = [1, 2, 3, 4, 5, 6];

    return (
        <section className='my-10 md:my-16 rounded-2xl md:rounded-4xl p-6 sm:p-10 bg-[#03373D] max-w-7xl mx-auto'>
            {/* Header Section */}
            <div className='text-white flex flex-col items-center text-center mb-8 max-w-3xl mx-auto'>
                <h2 className='text-2xl sm:text-3xl font-bold mb-3'>Our services</h2>
                <p className='text-sm sm:text-base text-gray-200 leading-relaxed px-2'>
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                </p>
            </div>

            {/* Grid Container */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'> 
                {worksArray.map((works, index) => (
                    <div 
                        key={index} 
                        className='rounded-2xl flex flex-col gap-3 p-6 bg-gray-100 hover:shadow-lg transition-all'
                    >
                        <img className='w-12 h-12 object-contain' src={bookingICon} alt="bookingIcon" />
                        <h3 className='font-bold text-lg text-secondary'>Booking Pick & Drop</h3>
                        <p className='text-gray-600 text-sm sm:text-base leading-relaxed'>
                            From personal packages to business shipments we deliver on time, every Time.
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services;