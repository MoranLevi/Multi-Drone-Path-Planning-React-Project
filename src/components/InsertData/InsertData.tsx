import React, { useRef, FC, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { UIActions } from 'src/redux/actions/UIActions';
import { useAppDispatch } from 'src/redux/hooks';
import classNames from 'classnames';
import './InsertData.css';

/* InsertData component */
const InsertData: FC = () => {

    const dispatch = useAppDispatch(); /* define hook to dispatch actions */  
    const navigate = useNavigate(); /* define hook to navigate to other pages */
    
    const fileInput = useRef<any>(null); /* define a reference to the file input element */
    
    /* define the state of the component */
    const [selectedRadioBtn, setSelectedRadioBtn] = useState<string>('radio1');
    const [localNumberOfDrones, setLocalNumberOfDrones] = useState<string>('');
    const [isUploadFile, setIsUploadFile] = useState<boolean>(false);
    const [uploadFile, setUploadFile] = useState<File | undefined>(undefined);
    const [numberOfDronesError, setNumberOfDronesError] = useState<string | undefined>(undefined);
    
    /* define css string for the upload file button, depending on whether a file has already been uploaded or not */
    const uploadFileButtonClassName = classNames('button-upload-file', {
        'button-upload-file-succeeded': isUploadFile,
    })

    /* function that check if radioBtnName is the last radio button than selected */
    const isRadioSelected = (radioBtnName: string): boolean => {
        return (selectedRadioBtn === radioBtnName);
    }

    /* function that handle the click on a radio button */
    const handleRadioClick = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSelectedRadioBtn(event.currentTarget.value); /* save the value of selected radio button */
        setLocalNumberOfDrones(''); /* reset the number of drones */
        if(event.currentTarget.value === 'radio2') { /* if the number of drones is known */
            setNumberOfDronesError('');
        } 
        else {
            setNumberOfDronesError(undefined);
        }
    }

    /* function that handle the click on the continue button */
    const handleClickContinueButton = () => {
        dispatch(UIActions.updateTargetsFile(uploadFile)) /* save the targets file */
        console.log('uploadFile: ', uploadFile)

        if(selectedRadioBtn === 'radio2') { /* number of drones is known */
            dispatch(UIActions.updateNumberOfDrones(Number(localNumberOfDrones))) /* save the number of drones */
            navigate('/compareNumberOfDrones'); /* navigate to the compareNumberOfDrones page */
            return;
        }

        /* number of drones is unknown */
        dispatch(UIActions.updateNumberOfDrones(-1)) /* a value of -1 indicates that the number of drones is unknown */
        navigate('/results') /* navigate to the results page */
    };

    /* function that handles the file selection made in the file explorer */
    const handleFileChange = (event: any) => {
        const file = event.target.files[0];

        /* check if a file has been selected */
        if(file) {
            setIsUploadFile(true);
            setUploadFile(file);
        }
      };

    /* function that handle the click on the upload file button */
    const handleChooseFileClick = () => {

        /* check if the file input element has been rendered */
        if (fileInput.current) {
            fileInput.current.click();
        } else {
          console.log('File input not yet rendered');
        }
      };
    
    /* function that check if the continue button should be disabled */
    const disableContinueButton = (): boolean => {

        if(uploadFile === undefined) { /* check if a file has been uploaded */
            return true;
        }
        if(selectedRadioBtn === 'radio2' && numberOfDronesError !== undefined) { /* check if the number of drones is valid when click on radio2 */
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
        <div id='InsertData'>
            <div className='upload-target-locations-container'>
                <div className='main-title-container'>
                    <label className='required-asterisk'>*</label>
                    <h1 className='title-text'>Upload target locations</h1>
                </div>        
                <div className='upload-file-container'>
                    <label className='upload-file-text'>Upload file:</label>
                    <form> {/* form that contains the file input element from file explorer */}
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
                    <label className='radio-btn-text'>Number of drones is unknown</label>
                </div>
                <div className='option-radio-row-container'>
                    <input type='radio' name='radio-btn' value='radio2' checked={isRadioSelected('radio2')} onChange={handleRadioClick}/>
                        <label className='radio-btn-text'>Number of drones is known</label>
                        {selectedRadioBtn === 'radio2' && 
                            <div className='insert-numbers-of-drones-container'>
                                <label className='required-asterisk'>*</label>
                                <label className='insert-number-of-drones-text'>Number of drones:</label>
                                <input type="text" className='insert-number-of-drones-input' value={localNumberOfDrones} onChange={onChangeNumberOfDrones}></input>
                            </div>}
                        {selectedRadioBtn === 'radio2' &&  
                            <span className='error-msg'>{numberOfDronesError}</span>} {/* show the error message if the number of drones is not valid */}
                </div>   
            </div>
            <div className='continue-button-container'>
                <button className='continue-button' onClick={handleClickContinueButton} disabled={disableContinueButton()}>Continue</button>
            </div>
        </div>
    );
};

export default InsertData; /* export InsertData component */