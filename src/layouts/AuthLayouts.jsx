import React from 'react';
import Logo from '../components/logo/Logo';
import { Outlet } from 'react-router';
import authImage from '../assets/authImage.png';

const AuthLayouts = () => {
    return (
        <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 lg:pt-8">

            {/* Logo */}
            <Logo />

            {/* Main Content */}
            <div className="min-h-[calc(100vh-120px)] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">

                {/* Left Side - Login/Register Form */}
                <div className="w-full lg:w-1/2 flex justify-center">
                    <Outlet />
                </div>

                {/* Right Side - Image */}
                <div className="hidden lg:flex lg:w-1/2 justify-center items-center">
                    <img
                        src={authImage}
                        alt="Authentication"
                        className="w-full max-w-lg h-auto object-contain"
                    />
                </div>

            </div>
        </div>
    );
};

export default AuthLayouts;