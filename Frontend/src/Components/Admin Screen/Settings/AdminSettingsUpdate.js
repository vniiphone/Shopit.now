import React, { Component } from 'react';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdminChangesInput from './AdminChangesInput';
import SubmissionButton from '../SubmissionButton';

class AdminSettingsUpdate extends Component {
    
    render() {
        const {onSubmission,error,performSubmit,changeValue,onChange,btn,changeRef,handleSettings}=this.props;
        return (
            <div ref={changeRef} className="mainpulate-account">
                
                <FontAwesomeIcon 
                    onClick={()=>
                    !onSubmission ? handleSettings(changeRef):null}
                    className="back-btn" 
                    icon={faArrowLeft} 
                /> 
                <AdminChangesInput 
                    error={error} 
                    onChange={onChange} 
                    value={changeValue} 
                    labelName="Confirm Password"/>
                <SubmissionButton
                    onSubmission={onSubmission}
                    onClick={performSubmit}
                    btn={btn}
                />
            </div>           
        );
    }
}

export default AdminSettingsUpdate;