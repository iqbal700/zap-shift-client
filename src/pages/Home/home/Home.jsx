import React from 'react';
import Banner from '../banner/Banner';
import Works from '../works/Works';
import Services from '../services/Services';
import Brands from '../brands/Brands';
import Reviews from '../reviews/Reviews';
import AskQuestion from '../AskQuestion/AskQuestion';

const reviewPromise = fetch('/reviews.json').then(res => res.json())

const Home = () => {
    return (
        <div className="overflow-hidden"> 
             <Banner />
             <Works />
             <Services />
             <Brands />
             <Reviews reviewPromise={reviewPromise} />
             <AskQuestion/> 
        </div>
    );
};

export default Home;