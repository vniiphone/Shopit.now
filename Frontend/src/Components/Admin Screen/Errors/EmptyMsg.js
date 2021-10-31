import React, { Component } from 'react';
import Lottie from 'lottie-react';
import dataEmpty from "../../../animations/empty-box.json";

class EmptyMsg extends Component {
    
    render() {
        const {msg}=this.props;
        return (
            <div className="data-empty-animation-container">
                <Lottie loop={false} className="data-empty-animation" animationData={dataEmpty} />
                <h2>{msg}</h2>
            </div>
        );
    }
}

export default EmptyMsg;