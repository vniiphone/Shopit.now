import React, { Component } from 'react';
import dataLoading from "../../../animations/dataload.json";
import Lottie from 'lottie-react';

class DataLoad extends Component {
    render() {
        return (
            <div className="data-animation-loading-container">
                <Lottie className="animation-loading-logo" animationData={dataLoading} />
            </div>
        );
    }
}

export default DataLoad;