import React, { Component } from 'react';
import Lottie from 'lottie-react';
import networkAnim from "../../../animations/unknownerror.json";

class NetworkError extends Component {
    
    render() {
        return (
            <div className="network-error-animation-container">
                <Lottie className="network-error-animation" animationData={networkAnim} />
                <h2>Unknown error occured. Try again later...</h2>
            </div>
        );
    }
}

export default NetworkError;