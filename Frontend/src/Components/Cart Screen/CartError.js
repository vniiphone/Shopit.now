import React, { Component } from 'react';
import Lottie from 'lottie-react';
import warning from '../../animations/error_warning.json';

class CartError extends Component {
    
    render() {
        return (
            <div className="cart-error-container">
                <Lottie className="cart-error-anim" animationData={warning} />
                <h5>Sorry...cannot get the cart right now...Try again later...</h5>
            </div>        
        );
    }
}

export default CartError;