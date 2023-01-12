import { FC, useState } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { useQuery } from 'react-query';
import { Spin } from 'antd';
import React from 'react';
import axios from 'axios';
import './Results.css';

const Results: FC = () => {

    const { numberOfDrones, targetsFile } = useAppSelector(state => state.ui.layout);
    
    const [isOptimalNumberOfDronesData, setIsOptimalNumberOfDronesData]   = useState<boolean>(false);
    const [isRequiredNumberOfDronesData, setIsRequiredNumberOfDronesData] = useState<boolean>(false);

    const fileName = targetsFile ? targetsFile.name : 'TSP100.txt';

    // number of drones is unknown
    const {data: optimalData, isLoading: isOptimalLoading, isError: isErrorLoading} = useQuery('optimal-targets-classification', async () => {
        const response = await axios.get(`http://localhost:8000/optimal-targets-classification`, { params: { fileName } })
        return response.data;
        // console.log("fetching")
        // return axios.get(`http://localhost:8000/optimal-targets-classification`)
    }, {
        enabled: !isOptimalNumberOfDronesData && numberOfDrones === -1,
        onError: () => {
            console.error("fetch error")
        },
        onSuccess: (data) => {
            setIsOptimalNumberOfDronesData(true);
            console.log("success", data)
        }
    })

    // number of drones is known
    const {data: requiredData, isLoading: isRequiredLoading, isError: isRequiredError} = useQuery('required-targets-classification',() => {
        return axios.get(`http://localhost:8000/required-targets-classification`, { params: { fileName, numberOfDrones } })
        // return axios.get(`http://localhost:8000/required-targets-classification`)
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

    const array = [[1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5], [6,7,8,9,10], [11,12,13,14,15], [16,17,18] ]

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