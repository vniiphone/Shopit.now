import React, { Component } from 'react';
import submitIcon from '../../animations/dataload.json';
import Lottie from 'lottie-react';

class AddressBtn extends Component {
    
    render() {
        const {onSubmission,name}=this.props;
        return (
            <h3>
                <button type='submit' disabled={onSubmission?true:false} className={onSubmission?"address-input-btn-disable":""}>
                    {onSubmission && <Lottie className="add-change-submit-icon" animationData={submitIcon} />}
                    <span className={onSubmission? "address-input-button-span":""}>
                        {name}
                    </span>
                </button>
            </h3>
        );
    }
}

export default AddressBtn;