import React from 'react';
import { useNavigate } from 'react-router';

const Forbidden = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center px-4">
            <div className="max-w-md text-center p-8 bg-base-100 rounded-2xl shadow-xl border border-base-300">
                
                {/* Shield/Lock Warning Icon */}
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-red-50 rounded-full text-red-500 animate-bounce">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                </div>

                {/* Error Code & Title */}
                <h1 className="text-7xl font-extrabold text-red-500 mb-2">403</h1>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Access Denied / Forbidden</h2>
                
                {/* Informative Message */}
                <p className="text-gray-500 mb-8 text-sm sm:text-base leading-relaxed">
                    Sorry, you don't have permission to access this page. This area is restricted or requires admin privileges.
                </p>

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="btn btn-outline btn-secondary w-full sm:w-auto"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Go Back
                    </button>
                    
                    <button 
                        onClick={() => navigate('/')} 
                        className="btn btn-primary text-white w-full sm:w-auto"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Forbidden;