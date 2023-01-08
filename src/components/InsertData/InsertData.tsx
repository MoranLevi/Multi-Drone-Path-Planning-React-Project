import React, { useRef } from 'react';
import { FC, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { UIActions } from 'src/redux/actions/UIActions';
import { useAppDispatch } from 'src/redux/hooks';
import classNames from 'classnames';
import './InsertData.css';
import { useMutation } from 'react-query';
import axios from 'axios';

const InsertData: FC = () => {

    const dispatch = useAppDispatch();
    
    const navigate = useNavigate();
    const fileInput = useRef<any>(null); // change type any to the correct type
    
    const [selectedRadioBtn, setSelectedRadioBtn] = useState<string>('radio2');
    const [localNumberOfDrones, setLocalNumberOfDrones] = useState<string>('');
    const [isUploadFile, setIsUploadFile] = useState<boolean>(false);
    const [uploadFile, setUploadFile] = useState<File | undefined>(undefined);
    const [numberOfDronesError, setNumberOfDronesError] = useState<string | undefined>(undefined);

    const mutationNumberOfDronesData = useMutation<any, any, any, any>({
        mutationFn: newNumberOfDronesData => {
            return axios.post(`http://localhost:8000/numberOfDronesData`, newNumberOfDronesData);
        }
    })
    
    const uploadFileButtonClassName = classNames('button-upload-file', {
        'button-upload-file-succeeded': isUploadFile,
    })

    const isRadioSelected = (radioBtnName: string): boolean => {
        return (selectedRadioBtn === radioBtnName);
    }

    const handleRadioClick = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSelectedRadioBtn(event.currentTarget.value); // save the value of selected radio button
        setLocalNumberOfDrones(''); // reset the number of drones
        if(event.currentTarget.value === 'radio1') { // the first time the user clicks on the radio button
            setNumberOfDronesError('');
        } 
        else {
            setNumberOfDronesError(undefined);
        }
    }

    const handleClickContinueButton = () => {
        dispatch(UIActions.updateTargetsFile(uploadFile))
        
        if(selectedRadioBtn === 'radio1') { //number of drones is known
            mutationNumberOfDronesData.mutate({ numberOfDrones: localNumberOfDrones })
            dispatch(UIActions.updateNumberOfDrones(Number(localNumberOfDrones)))
            navigate('/compareNumberOfDrones');
            return;
        }

        // number of drones is unknown
        dispatch(UIActions.updateNumberOfDrones(-1)) // -1 means that the number of drones is unknown
        navigate('/results')
    };

    const handleFileChange = (event: any) => { //change any type to the correct type
        const file = event.target.files[0];

        if(file) {
            setIsUploadFile(true);
            setUploadFile(file);
        }
    
        // if (file) {
        //   const reader = new FileReader();
        //   reader.onload = () => {
        //     const data = new FormData();
        //     data.append('file', file);
        //     data.append('fileName', file.name);
    
        //     // Send the file to the server using an HTTP library like Axios
        //     axios.post('/upload', data).then(response => {
        //       console.log(response);
        //     });
        //   };
        //   reader.readAsArrayBuffer(file);
        // }
      };

    const handleChooseFileClick = () => {
        if (fileInput.current) {
            fileInput.current.click();
        } else {
          console.log('File input not yet rendered');
        }
      };

    const disableContinueButton = (): boolean => {
        if(uploadFile === undefined) {
            return true;
        }
        if(selectedRadioBtn === 'radio1' && numberOfDronesError !== undefined) {
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
        <div id='InsertData'>
            <div className='upload-target-locations-container'>
                <div className='main-title-container'>
                    <label className='required-asterisk'>*</label>
                    <h1 className='title-text'>Upload target locations</h1>
                </div>        
                <div className='upload-file-container'>
                    <label className='upload-file-text'>Upload file:</label>
                    <form>
                        <input type="file" accept='.txt' ref={fileInput} onChange={handleFileChange} className='disapper-file-upload'/>
                        <button type="button" onClick={handleChooseFileClick} className={uploadFileButtonClassName}>
                            Choose File
                        </button>
                    </form>
                    <label className='upload-file-name-text'>{uploadFile ? uploadFile.name : ''}</label>
                </div>
            </div>
            <div className='numbers-of-drones-container'>
                <div className='main-title-container'>
                    <label className='required-asterisk'>*</label>
                    <h1 className='title-text'>Select one of the options</h1>
                </div>
                <div className='option-radio-row-container'>
                    <input type='radio' name='radio-btn' value='radio1' checked={isRadioSelected('radio1')} onChange={handleRadioClick}/>
                    <label className='radio-btn-text'>Number of drones in known</label>
                    {selectedRadioBtn === 'radio1' && 
                        <div className='insert-numbers-of-drones-container'>
                            <label className='required-asterisk'>*</label>
                            <label className='insert-number-of-drones-text'>Number of drones:</label>
                            {/* <input type="text" className='insert-number-of-drones-input' value={localNumberOfDrones} onChange={event => setLocalNumberOfDrones(event.target.value)}></input> */}
                            <input type="text" className='insert-number-of-drones-input' value={localNumberOfDrones} onChange={onChangeNumberOfDrones}></input>
                        </div>}
                    {selectedRadioBtn === 'radio1' && 
                        <span className='error-msg'>{numberOfDronesError}</span>}
                </div>
                <div className='option-radio-row-container'>
                    <input type='radio' name='radio-btn' value='radio2' checked={isRadioSelected('radio2')} onChange={handleRadioClick}/>
                    <label className='radio-btn-text'>Number of drones in unknown</label>
                </div>   
            </div>
            <div className='continue-button-container'>
                <button className='continue-button' onClick={handleClickContinueButton} disabled={disableContinueButton()}>Continue</button>
            </div>
        </div>
    );
};

export default InsertData;