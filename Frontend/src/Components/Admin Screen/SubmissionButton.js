import React, { Component } from 'react';
import loading from '../../animations/dataload.json';
import Lottie from 'lottie-react';

class SubmissionButton extends Component {
    render() {
        const {onSubmission,btn,...rest}=this.props;
        return (
            <h5>
                <button className={onSubmission ? "button-disable":""} {...rest}>
                    {onSubmission && <Lottie className="loading-bar" animationData={loading} />}
                    <span className={onSubmission ?"loading-started-button":""}>{btn}</span>
                </button>
            </h5>
        );
    }
}

export default SubmissionButton;