import React, { Component } from 'react';
import Lottie from "lottie-react";
import loadingAnim from "../../animations/loading.json";

class CartLoadin extends Component {
    state = {  }
    render() {
        return (
            <Lottie className="cart-loading-anim" animationData={loadingAnim} />
        );
    }
}

export default CartLoadin;