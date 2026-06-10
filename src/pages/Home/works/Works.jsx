import React from 'react';
import bookingIcon from '../../../assets/bookingIcon.png'

const Works = () => {

    const worksArray = [1,2,3]

    return (
        <div>
            <h1 className='text-3xl p-4 font-bold mt-10'>How it works</h1>
            <div className='flex gap-3 p-4 '>
                {
                worksArray.map((works, index) => (
                    <div key={index} className='w-150 rounded-2xl flex flex-col gap-2 p-5 bg-gray-100 '>
                        <img className='w-15' src={bookingIcon} alt="bookingIcon" />
                        <h1 className='font-bold text-secondary'>Booking Pick & Drop</h1>
                        <p >From personal packages to business shipments we deliver on time, every Time</p>
                        
                    </div>
                 )
                    
                )
            }
            </div>
            
            
        </div>
    );
};

export default Works;