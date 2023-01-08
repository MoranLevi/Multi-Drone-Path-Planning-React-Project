import { FC, useState } from 'react';
import React from 'react';
import { useNavigate  } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { UIActions } from 'src/redux/actions/UIActions';
import { useQuery } from 'react-query';
import axios from 'axios';
import './CompareNumberOfDrones.css';

const CompareNumberOfDrones: FC = () => {

    const dispatch = useAppDispatch();
    
    const navigate = useNavigate();
    
    const { numberOfDrones, targetsFile } = useAppSelector(state => state.ui.layout);
    
    const [localNumberOfDrones, setLocalNumberOfDrones] = useState<string>('');
    const [numberOfDronesError, setNumberOfDronesError] = useState<string | undefined>(undefined);

    // optimal number of drones
    const {data: optimalData, isLoading: isOptimalLoading, isError: isErrorLoading} = useQuery('optimal-targets-classification',() => {
        // return axios.get(`http://localhost:8000/optimal-targets-classification`, { params: { targetsFile } })
        return axios.get(`http://localhost:8000/optimal-targets-classification`)
    }, {
        refetchInterval: 5000,
        onError: () => {
            console.error("fetch error")
        },
    })

    console.warn("optimalData", optimalData)
    
    const handleClickContinueWithChangeButton = () => {
        if(numberOfDronesError !== undefined) {
            return;
        }
        dispatch(UIActions.updateNumberOfDrones(Number(localNumberOfDrones)))
        navigate('/results');
    };

    const handleClickContinueWithoutChangeButton = () => {
        navigate('/results');
    };

    const disableContinueWithChangeButton = (): boolean => {
        if(localNumberOfDrones === '' || numberOfDronesError !== undefined) {
            return true;
        }
        return false;
    };

    const onChangeNumberOfDrones = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setLocalNumberOfDrones(event.target.value);

        const numberOfDrones = Number(event.target.value);
        if(numberOfDrones === 0) {
            setNumberOfDronesError('Required');
            return;
        }
        if(Number.isNaN(numberOfDrones)) {
            setNumberOfDronesError('Must be a number');
            return;
        }
        if(numberOfDrones < 0 ) {
            setNumberOfDronesError('Must be a positive number');
            return;
        }
        if(Number.isInteger(numberOfDrones) === false) {
            setNumberOfDronesError('Must be an integer number');
            return;
        }
        setNumberOfDronesError(undefined);
    };

    return (
        <div id='CompareNumberOfDrones'>
            <div className='display-number-of-drones-selected-container'>
                <h1 className='title-text'>The number of drones you selected:</h1>
                <label className='number-text'>{numberOfDrones}</label>
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
                        <input type="text" className='change-number-of-drones-input' value={localNumberOfDrones} onChange={onChangeNumberOfDrones}></input>
                        <span className='error-msg'>{numberOfDronesError}</span>
                    </div>
                    <div>
                        <button className='continue-button' onClick={handleClickContinueWithChangeButton} disabled={disableContinueWithChangeButton()}>Continue</button>
                    </div>
                </div>
                <div className='box-continue-without-change-number-of-drones'>
                    <button className='continue-button' onClick={handleClickContinueWithoutChangeButton}>Continue without changing the number</button>
                </div>
            </div>
        </div>
    );
};

export default CompareNumberOfDrones;
