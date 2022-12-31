import React from 'react';
import { FC, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { UIActions } from 'src/redux/actions/UIActions';
import { useAppDispatch } from 'src/redux/hooks';
import * as Yup from 'yup';
import './InsertData.css';

const InsertData: FC = () => {

    const dispatch = useAppDispatch();
    
    const navigate = useNavigate();

    const [selectedRadioBtn, setSelectedRadioBtn] = useState<string>('radio2');
    const [localNumberOfDrones, setLocalNumberOfDrones] = useState('');

    const isRadioSelected = (radioBtnName: string): boolean => {
        return (selectedRadioBtn === radioBtnName);
    }

    const handleRadioClick = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSelectedRadioBtn(event.currentTarget.value); // save the value of selected radio button
    }

    const handleClickContinueButton = () => {
        if(selectedRadioBtn === 'radio1') { //number of drones is known
            dispatch(UIActions.updateNumberOfDrones(Number(localNumberOfDrones)))
            // navigate('/compareDrones');
            return;
        }
        // number of drones is unknown
        dispatch(UIActions.updateNumberOfDrones(-1)) // -1 means that the number of drones is unknown
        // navigate('/results')
    };

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
                <div className='option-radio-row-container'>
                    <input type='radio' name='radio-btn' value='radio1' checked={isRadioSelected('radio1')} onChange={handleRadioClick}/>
                    <label className='radio-btn-text'>Number of drones in known</label>
                    {selectedRadioBtn === 'radio1' && 
                        <div className='insert-numbers-of-drones-container'>
                            <label className='insert-number-of-drones-text'>Number of drones:</label>
                            <input type="text" className='insert-number-of-drones-input' value={localNumberOfDrones} onChange={event => setLocalNumberOfDrones(event.target.value)}></input>
                        </div>}
                </div>
                <div className='option-radio-row-container'>
                    <input type='radio' name='radio-btn' value='radio2' checked={isRadioSelected('radio2')} onChange={handleRadioClick}/>
                    <label className='radio-btn-text'>Number of drones in unknown</label>
                </div>   
            </div>
            <div className='continue-button-container'>
                <button className='continue-button' onClick={handleClickContinueButton}>Continue</button>
            </div>
        </div>
    );
};

export default InsertData;