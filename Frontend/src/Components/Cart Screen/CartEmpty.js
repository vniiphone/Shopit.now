import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Lottie from 'lottie-react';
import cart from "../../animations/cart.json";

class CartEmpty extends Component {
    
    render() {
        return (
            <div className="cart-empty">
                <Lottie className="cart-empty-anim" animationData={cart} />
                <h3>Your Cart is Currently Empty</h3>
                <p>
                    Before proceed to checkout you must add some product to your shopping cart.
                </p>
                <Link to="/" className="go-shopping">Go Shopping</Link>
            </div>
        );
    }
}

export default CartEmpty;