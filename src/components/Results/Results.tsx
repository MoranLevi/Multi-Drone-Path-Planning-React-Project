import { FC, useState } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { useQuery } from 'react-query';
import { Configuration } from 'src/Configuration';
import { Spin } from 'antd';
import React from 'react';
import axios from 'axios';
import './Results.css';


const Results: FC = () => {
    
    const { numberOfDrones, targetsFile } = useAppSelector(state => state.ui.layout);
    
    const [isOptimalNumberOfDronesData, setIsOptimalNumberOfDronesData]   = useState<boolean>(false);
    const [isRequiredNumberOfDronesData, setIsRequiredNumberOfDronesData] = useState<boolean>(false);
    const [localNumberOfDrones, setLocalNumberOfDrones] = useState<number | undefined>(numberOfDrones);

    const fileName = targetsFile ? targetsFile.name : 'TSP100.txt';

    // number of drones is unknown
    const {data: optimalData, isLoading: isOptimalLoading, isError: isErrorLoading} = useQuery('optimal-targets-classification', async () => {
        const response = await axios.get(`${Configuration.backend.url}:${Configuration.backend.port}/optimal-targets-classification`, { params: { fileName } })
        return response.data;
    }, {
        enabled: !isOptimalNumberOfDronesData && numberOfDrones === -1,
        onError: () => {
            console.error("fetch error")
        },
        onSuccess: (data) => {
            setIsOptimalNumberOfDronesData(true);
            setLocalNumberOfDrones(data.length);
            console.log("success", data)
        }
    })

    // number of drones is known
    const {data: requiredData, isLoading: isRequiredLoading, isError: isRequiredError} = useQuery('required-targets-classification', async () => {
        const response = await axios.get(`${Configuration.backend.url}:${Configuration.backend.port}/required-targets-classification`, { params: { fileName, numberOfDrones } })
        return response.data;
    }, {
        enabled: !isRequiredNumberOfDronesData && numberOfDrones !== -1,
        onError: () => {
            console.error("fetch error")
        },
        onSuccess: (data) => {
            setIsRequiredNumberOfDronesData(true);
            console.log("success", data)
        }
    })

    if (isOptimalLoading || isRequiredLoading) {
        return (
            <div className='loading-spinner'>
                <Spin size="large" tip="Loading..."/>
            </div> 
        );
    }

    const array = numberOfDrones === -1 ? optimalData : requiredData;

    const checkIfLastElement = (dataArray: number[], index: number) => {
        return index !== dataArray.length - 1;
    }

    const renderDronesPath = () => {
        if(!array) {
            return (<div></div>);
        }

        return array.map((arrayOfObjects: any[], index: number) => {
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
            <h1 className='title-text'>{`The best paths the system has calculated for ${localNumberOfDrones} drones:`}</h1>
            <div className='list-drones-path-container'>
                {renderDronesPath()}
            </div>
        </div>
    );
};

export default Results;