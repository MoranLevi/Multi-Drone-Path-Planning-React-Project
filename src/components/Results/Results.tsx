import React, { FC, useState } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { useQuery } from 'react-query';
import { Configuration } from 'src/Configuration';
import { Spin } from 'antd';
import axios from 'axios';
import './Results.css';

/* Results component */
const Results: FC = () => {
    
    /* define hook to get the number of drones and the targets file from the redux store */
    const { numberOfDrones, targetsFile } = useAppSelector(state => state.ui.layout);
    
    /* define the state of the component */
    const [isOptimalNumberOfDronesData, setIsOptimalNumberOfDronesData]   = useState<boolean>(false);
    const [isRequiredNumberOfDronesData, setIsRequiredNumberOfDronesData] = useState<boolean>(false);
    const [localNumberOfDrones, setLocalNumberOfDrones] = useState<number | undefined>(numberOfDrones);

    /* define default to file name of the file, if targetsFile from redux is undefined */
    const fileName = targetsFile ? targetsFile.name : 'TSP100.txt';

    /* define query to get the routes of the drones for the optimal number of drones */
    const { data: optimalData, isLoading: isOptimalLoading } = useQuery('optimal-targets-classification', async () => {
        const response = await axios.get(`${Configuration.backend.url}:${Configuration.backend.port}/optimal-targets-classification`, { params: { fileName } })
        return response.data;
    }, {
        enabled: !isOptimalNumberOfDronesData && numberOfDrones === -1, /* enable the query only if the optimal number of drones data is not fetched yet, and number of drones is equal to -1 */
        onError: () => { /* handle error */
            console.error("fetch error")
        },
        onSuccess: (data) => { /* handle success */
            setIsOptimalNumberOfDronesData(true); /* set the optimal number of drones data to fetched */
            setLocalNumberOfDrones(data.length); /* set the local number of drones to the length of the optimal data */
            console.log("success", data)
        }
    })

    /* define query to get the routes of the drones for the specified number of drones entered by the user */
    const { data: requiredData, isLoading: isRequiredLoading } = useQuery('required-targets-classification', async () => {
        const response = await axios.get(`${Configuration.backend.url}:${Configuration.backend.port}/required-targets-classification`, { params: { fileName, numberOfDrones } })
        return response.data;
    }, {
        enabled: !isRequiredNumberOfDronesData && numberOfDrones !== -1, /* enable the query only if the required number of drones data is not fetched yet, and number of drones is not equal to -1 */
        onError: () => { /* handle error */
            console.error("fetch error")
        },
        onSuccess: (data) => { /* handle success */
            setIsRequiredNumberOfDronesData(true); /* set the required number of drones data to fetched */
            console.log("success", data)
        }
    })

    /* render the loading spinner if the data is loading */
    if (isOptimalLoading || isRequiredLoading) {
        return (
            <div className='loading-spinner'>
                <Spin size="large" tip="Loading..."/>
            </div> 
        );
    }

    /* define the array of drones paths to render */
    const array = numberOfDrones === -1 ? optimalData : requiredData;

    /* define function to check if the current element is the last element in the array */
    const checkIfLastElement = (dataArray: number[], index: number) => {
        return index !== dataArray.length - 1;
    }

    /* define function to render the drones paths */
    const renderDronesPath = () => {

        if(!array) { /* if the array is undefined, return empty div */
            return (<div></div>);
        }

        /* return the drones paths */
        return array.map((arrayOfObjects: any[], index: number) => {
            return (
                <div className='drone-path-container'>
                    <h1 className='text-drone'>{`Drone ${index + 1}:`}</h1>
                    <div className='drone-path'>
                        {arrayOfObjects.map((object, index, row) => { /* return the objects of the drone path */
                            return (
                                <div className='drone-path-object'>
                                    <label className='number-text-drone'>{object + (checkIfLastElement(arrayOfObjects, index) ? ' ->' : '')}</label>
                                </div>
                            )
                        })}
                    </div>
                    <br/>
                </div>
            )
        })
    }

    return (
        <div id='Results'>
            <h1 className='title-text'>{`The best paths calculated for ${localNumberOfDrones} drones:`}</h1>
            <div className='list-drones-path-container'>
                {renderDronesPath()} {/* render the drones paths */}
            </div>
        </div>
    );
};

export default Results; /* export Results component */