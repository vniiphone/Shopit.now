import React, { Component } from 'react';
import Lottie from 'lottie-react';
import loading from '../../animations/smallLoad.json'; 

class Success extends Component {

    render() {
        return (
            <div className="registration-login-success-loader">
                <Lottie className="loader" animationData={loading}/>
            </div>
        );
    }
}

export default Success;