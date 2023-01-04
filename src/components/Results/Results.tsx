import { FC } from 'react';
import React from 'react';
import { useNavigate  } from 'react-router-dom';
import './Results.css';
import { useAppSelector } from 'src/redux/hooks';

const Results: FC = () => {

    const { numberOfDrones } = useAppSelector(state => state.ui.layout);
    
    //array of arrays of objects
    const array = [[1,2,3,4,5], [6,7,8,9,10], [11,12,13,14,15], [16,17,18] ]

    const checkIfLastElement = (dataArray: number[], index: number) => {
        return index !== dataArray.length - 1;
    }
    const renderDronesPath = () => {
        return array.map((arrayOfObjects, index) => {
            return (
                <div className='drone-path-container'>
                    <h1 className='title-text'>{`Drone ${index + 1}:`}</h1>
                    <div className='drone-path'>
                        {arrayOfObjects.map((object, index, row) => {
                            return (
                                <div className='drone-path-object'>
                                    <label className='number-text'>{object + (checkIfLastElement(arrayOfObjects, index) ? ' ->' : '')}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        })
    }

    return (
        <div id='Results'>
            <h1 className='title-text'>{`The best paths the system has calculated for ${numberOfDrones} drones:`}</h1>
            <div className='list-drones-path-container'>
                {renderDronesPath()}
            </div>
        </div>
    );
};

export default Results;