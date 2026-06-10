import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({review}) => {
    const {userName, review:reviews, user_photoURL} = review;
    return (
       <div className="card w-96 bg-base-100 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="card-body">
                {/* Quote Icon & Rating */}
                <div className="flex justify-between items-center mb-4">
                    <FaQuoteLeft className="text-primary text-3xl opacity-20" />
                    <div className="flex text-orange-400">
                        {[...Array(review.rating)].map((_, i) => (
                            <FaStar key={i} />
                        ))}
                    </div>
                </div>

                {/* Feedback Text */}
                <p className="text-gray-600 italic leading-relaxed">
                    {reviews}
                </p>

                <div className="divider opacity-50"></div>

                {/* User Info */}
                <div className="flex items-center gap-4">
                    <div className="avatar">
                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user_photoURL} alt={review.name} />
                        </div>
                    </div>
                    <div>
                        <h2 className="font-bold text-lg leading-none">{userName}</h2>
                        <p className="text-sm text-gray-500 mt-1">{review.position}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;