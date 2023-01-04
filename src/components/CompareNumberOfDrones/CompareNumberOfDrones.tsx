import { FC } from 'react';
import React from 'react';
import { useNavigate  } from 'react-router-dom';
import './CompareNumberOfDrones.css';
import { useAppSelector } from 'src/redux/hooks';

const CompareNumberOfDrones: FC = () => {

    const { numberOfDrones } = useAppSelector(state => state.ui.layout);
    
    return (
        <div id='CompareNumberOfDrones'>
            <div className='display-number-of-drones-selected-container'>
                <h1 className='title-text'>The number of drones you selected:</h1>
                <label className='number-text'>{5}</label>
                {/* <label className='number-text'>{numberOfDrones}</label> */}
            </div>
            <div className='display-number-of-drones-optimal-container'>
                <div className='optimal-number-title-container'>
                    <h1 className='title-text'>The optimal number of drones the</h1>
                    <h1 className='title-text'>system has calculated:</h1>
                </div>
                <label className='number-text'>{4}</label>
            </div>
            <div className='continue-buttons-container'>
                <div className='box-continue-with-change-number-of-drones'>
                    <div className='change-number-of-drones'>
                        <label className='change-text'>Change number of drones:</label>
                        <input type="text" className='change-number-of-drones-input'></input>
                    </div>
                    <div>
                        <button className='continue-button'>Continue</button>
                    </div>
                </div>
                <div className='box-continue-without-change-number-of-drones'>
                    <button className='continue-button'>Continue without changing the number</button>
                </div>
            </div>
        </div>
    );
};

export default CompareNumberOfDrones;