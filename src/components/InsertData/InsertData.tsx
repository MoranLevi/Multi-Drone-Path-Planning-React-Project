import { FC } from 'react';
import React from 'react';
import './InsertData.css';

const InsertData: FC = () => {

    return (
        <div id='InsertData'>
            <div className='upload-target-locations-container'>
                <h1 className='title-text'>Upload target locations</h1>
                <div className='upload-file-container'>
                    <label className='upload-file-text'>Upload file:</label>
                    <div>hello</div>
                </div>
            </div>
            <div className='numbers-of-drones-container'>
                <h1 className='title-text'>Select one of the options</h1>
            </div>
            <button className='continue-button'>Continue</button>
        </div>
    );
};

export default InsertData;