import React, { Component } from 'react';
import '../../css/accountinput.css';

class AccountContainerInput extends Component {
    state = {  }
    render() {
        const {name,touched,errors,...rest}=this.props;
        return (
            <div className="input-container-account">
                <input placeholder=" " {...rest}/>
                <label htmlFor={name}>{name}</label>
                {(errors && touched) && <h5 className="error-display">{errors}</h5>}
            </div>
        );
    }
}

export default AccountContainerInput;