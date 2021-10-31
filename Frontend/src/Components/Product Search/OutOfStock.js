import React, { Component } from 'react'

class OutOfStock extends Component{
    
    render(){
        const {handleOutOfStock,stock}=this.props;
        return (
            <div className="out-of-stock-container">
                <h5>Availability</h5>
                <input checked={stock} onChange={handleOutOfStock} name="out-of-stock" type="checkbox" />
                <label htmlFor="out-of-stock">Include Out of Stock</label> 
            </div>
        );
    }

}

export default OutOfStock;