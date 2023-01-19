import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { UIActions } from 'src/redux/actions/UIActions';
import { useQuery } from 'react-query';
import { Spin } from 'antd';
import { Configuration } from 'src/Configuration';
import axios from 'axios';
import './CompareNumberOfDrones.css';

/* CompareNumberOfDrones component */
const CompareNumberOfDrones: FC = () => {

    const dispatch = useAppDispatch(); /* define hook to dispatch actions */
    const navigate = useNavigate(); /* define hook to navigate to other pages */
    
    /* define hook to get the number of drones and the targets file from the redux store */
    const { numberOfDrones, targetsFile } = useAppSelector(state => state.ui.layout);
    
    /* define the state of the component */
    const [localNumberOfDrones, setLocalNumberOfDrones] = useState<string>('');
    const [numberOfDronesError, setNumberOfDronesError] = useState<string | undefined>(undefined);
    const [isOptimalNumberOfDronesData, setIsOptimalNumberOfDronesData] = useState<boolean>(false);

    /* define default to file name of the file, if targetsFile from redux is undefined */
    const fileName = targetsFile ? targetsFile.name : 'TSP100.txt';

    /* define query to get the optimal number of drones */
    const { data: optimalData, isLoading: isOptimalLoading } = useQuery('optimal-targets-classification', async () => {
        const response = await axios.get(`${Configuration.backend.url}:${Configuration.backend.port}/optimal-targets-classification`, { params: { fileName } })
        return response.data;
    }, {
        enabled: !isOptimalNumberOfDronesData, /* enable the query only if the optimal number of drones data is not fetched yet */
        onError: () => { /* handle error */
            console.error("fetch error")
        },
        onSuccess: (data) => { /* handle success */
            setIsOptimalNumberOfDronesData(true); /* set the optimal number of drones data to fetched */
            console.log("success")
        }
    })
    
    /* define function to handle click on continue with change button */
    const handleClickContinueWithChangeButton = () => {
        if(numberOfDronesError !== undefined) { /* if there is an error in the number of drones input */
            return;
        }
        dispatch(UIActions.updateNumberOfDrones(Number(localNumberOfDrones))) /* update the number of drones in the redux store */
        navigate('/results'); /* navigate to results page */
    };

    /* define function to handle click on continue without change button */
    const handleClickContinueWithoutChangeButton = () => {
        navigate('/results'); /* navigate to results page */
    };

    /* define function to disable continue with change button */
    const disableContinueWithChangeButton = (): boolean => {
        /* if the number of drones input is empty or there is an error in the number of drones input -> disable the continue with change button */
        if(localNumberOfDrones === '' || numberOfDronesError !== undefined) {
            return true;
        }
        return false;
    };

    /* function that check if the numbersOfDrones that the user insert is valid */
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
        setNumberOfDronesError(undefined); /* the number of drones is valid */
    };

    return (
        <div id='CompareNumberOfDrones'>
            <div className='display-number-of-drones-selected-container'>
                <h1 className='title-text'>The number of drones you selected:</h1>
                <label className='number-text'>{numberOfDrones}</label>
            </div>
            <div className='display-number-of-drones-optimal-container'>
                <div className='optimal-number-title-container'>
                    <h1 className='title-text'>The optimal number of drones </h1>
                    <h1 className='title-text'>the system has calculated:</h1>
                </div>
                <label className='number-text'>{isOptimalLoading ? <Spin/> : optimalData.length}</label> {/* display the optimal number of drones, show spinner until its load */}
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
                    <button className='continue-button' onClick={handleClickContinueWithoutChangeButton} disabled={isOptimalLoading}>Continue without changing the number</button>
                </div>
            </div>
        </div>
    );
};

export default CompareNumberOfDrones; /* export CompareNumberOfDrones component */
