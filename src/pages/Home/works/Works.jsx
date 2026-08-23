import React from 'react';
import bookingIcon from '../../../assets/bookingIcon.png';

const Works = () => {
    const worksArray = [1, 2, 3];

    return (
        <section className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center md:text-left">
                How it works
            </h2>
            
            <div className="flex flex-col md:flex-row gap-4 lg:gap-6 justify-between">
                {worksArray.map((works, index) => (
                    <div 
                        key={index} 
                        className="w-full md:w-1/3 rounded-2xl flex flex-col gap-3 p-6 bg-gray-100 hover:shadow-md transition-shadow"
                    >
                        <img className="w-12 h-12 object-contain" src={bookingIcon} alt="bookingIcon" />
                        <h3 className="font-bold text-lg text-secondary">
                            Booking Pick & Drop
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                            From personal packages to business shipments we deliver on time, every Time.
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Works;