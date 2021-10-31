import React, { Component } from 'react';

class BtnContainer extends Component {
    state = {  }
    render() {

        const {handleGoBack,handleContinue,disableBtn,disable,disableBack}=this.props;

        return (
            <div className="order-process-btn-container">
                <button disabled={disableBack} onClick={handleGoBack}>Back</button>
                <button disabled={disable} className={disableBtn} onClick={handleContinue}>Continue</button>
            </div>
        );
    }
}

export default BtnContainer;