import React, { Component } from 'react';

class Cancellation extends Component {
    state = {  }
    render() {
        return (
            <div className="cancellation-reason">
                <h2>Order Cancellation</h2>
                <div>
                    <h5>Select a reason for cancellation</h5>
                    <select name="cancel" id="cancel">
                        <option value="1">Order Created by Mistake</option>
                        <option value="2">Item Price Too High</option>
                        <option value="3">Item Sold by third Party</option>
                        <option value="4">Item(s) Would Not Arrive on Time</option>
                        <option value="5">Other</option>
                    </select>
                </div>
                <div>
                    <h5>Write a reason (optional)</h5>
                    <textarea maxLength={150} />
                </div>
            </div>
        );
    }
}

export default Cancellation;