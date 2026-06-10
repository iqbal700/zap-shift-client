import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../pages/shared/Footer/Footer';
import Navbar from '../pages/shared/Navbar/Navbar';

const RootLayouts = () => {
    return (
        <div className='flex flex-col min-h-screen max-w-7xl mx-auto '>
            <Navbar> </Navbar>
            <div className='flex-1'>
                <Outlet> </Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayouts;