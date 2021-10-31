import React, { Component } from 'react';

class AdminInput extends Component {
    state = {  }
    render() {
        const {errors,touched,...rest}=this.props;
        return (
            <div className="admin-product-input-container">
                <input {...rest}/>
                {errors && touched && 
                    <h5>{errors}</h5>
                }
            </div>
        );
    }
}

export default AdminInput;