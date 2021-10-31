import React, { Component } from 'react';

class OrderSorting extends Component {

    render() {
        const {name,onClick}= this.props;
        return (
            <li onClick={()=>onClick(name)}>{name}</li>
        );
    }
}

export default OrderSorting;