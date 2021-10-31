import React, { Component } from 'react';

class AdminChangesInput extends Component {
    
    render() {
        const{passwordError,errors,touched,error,labelName,...rest}=this.props;
        return (
            <div className="admin-setting-input-container">
                <input type="password" placeholder=" " {...rest}/>
                <label>{labelName}</label>
                {(errors && touched)?
                    <h5>{errors}</h5>
                    :
                    <h5>{error}</h5>
                }
            </div>        
        );
    }
}

export default AdminChangesInput;