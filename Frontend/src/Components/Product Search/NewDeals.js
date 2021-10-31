import React, { Component } from 'react'

class NewDeals extends Component{
    
    render(){
        const {handleTodaysDeal,deal}=this.props;
        return (
            <div className="new-deals-container">
                <h5>Deals</h5>
                <input onChange={handleTodaysDeal} checked={deal} name="new-deals" type="checkbox" />
                <label htmlFor="new-deals">Today's Deals</label> 
            </div>
        );
    }

}

export default NewDeals;