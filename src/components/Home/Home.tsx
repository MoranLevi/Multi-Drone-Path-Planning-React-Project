import { FC } from 'react';
import React from 'react';
import './Home.css';

const Home: FC = () => {
    
    return (
        <div id='Home'>
            <div className='main-title-container'>
                <h1 className='main-title'>Path Planning</h1>
                <h1 className='main-title'>for Drones</h1>
            </div>
            <button className='start-button'>Click here to start</button>
        </div>
    );
};

export default Home;