import React, { FC } from 'react';
import { useNavigate  } from 'react-router-dom';
import './Home.css';

/* Home component */
const Home: FC = () => {
    
    const navigate = useNavigate(); /* define hook to navigate to other pages */

    const handleClick = () => {
        navigate('/insertData'); /* navigate to the insertData page */
    };

    return (
        <div id='Home'>
            <div className='main-title-container'> {/* container for the main title */}
                <h1 className='main-title'>Path Planning</h1>
                <h1 className='main-title'>for Drones</h1>
            </div>
            <button className='start-button' onClick={handleClick}>Click here to start</button> {/* button to navigate to the insertData page */}
        </div>
    );
};

export default Home; /* export Home component */