import React from 'react';
import Banner from '../banner/Banner';
import Works from '../works/Works';
import Services from '../services/Services';
import Brands from '../brands/Brands';
import Reviews from '../reviews/Reviews';

const reviewPromise = fetch('/reviews.json').then(res => res.json())

const Home = () => {
    return (
        <div>
            <Banner></Banner>
             <Works></Works>
             <Services></Services>
             <Brands></Brands>
             <Reviews reviewPromise={reviewPromise} ></Reviews>
        </div>
    );
};

export default Home;