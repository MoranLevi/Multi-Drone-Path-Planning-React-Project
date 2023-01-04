import { FC } from 'react';
import React from 'react';
import { useNavigate  } from 'react-router-dom';
import './CompareNumberOfDrones.css';
import { useAppSelector } from 'src/redux/hooks';

const CompareNumberOfDrones: FC = () => {

    const { numberOfDrones } = useAppSelector(state => state.ui.layout);
    console.log("lll", numberOfDrones)
    return (
        <div id='CompareNumberOfDrones'>
            {/* <div className='display-number-of-drones-selected'>
                <h1 className='title-text'>The number of drones you selected:</h1>
                <label className='number-text'>{5}</label>
            </div> */}
            {/* <div className='display-number-of-drones-optimal'>
                <div className='optimal-number-title-container'>
                    <h1 className='title-text'>The optimal number of drones the</h1>
                    <h1 className='title-text'>system has calculated:</h1>
                </div>
                <label className='number-text'>{4}</label>
            </div> */}
            <div className='display-number-of-drones-selected'>
                <h1 className='title-text'>The number of drones you selected:</h1>
                <label className='number-text'>{5}</label>
            </div>
            <div className='display-number-of-drones-optimal'>
                <div className='optimal-number-title-container'>
                    <h1 className='title-text'>The optimal number of drones the</h1>
                    <h1 className='title-text'>system has calculated:</h1>
                </div>
                <label className='number-text'>{4}</label>
            </div>
            <div>

            </div>
        </div>
    );
};

export default CompareNumberOfDrones;