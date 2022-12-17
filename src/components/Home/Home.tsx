import { FC } from 'react';
import React from 'react';
import { useNavigate  } from 'react-router-dom';
import './Home.css';

const Home: FC = () => {
    
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/insertData');
    };

    return (
        <div id='Home'>
            <div className='main-title-container'>
                <h1 className='main-title'>Path Planning</h1>
                <h1 className='main-title'>for Drones</h1>
            </div>
            <button className='start-button' onClick={handleClick}>Click here to start</button>
        </div>
    );
};

export default Home;