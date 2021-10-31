import React, { Component } from 'react';

class InputContainer extends Component {
    state = {  }
    render() {
        const {name,errors,touched,passwordError,...rest}=this.props;
        return (
            <div className="admin-settings-input-container">
                <input type="password" placeholder=" " autoComplete="off" spellCheck="false" autoCorrect="off" {...rest} />
                <label>{name}</label>
                {(errors && touched)?<h5>{errors}</h5>:passwordError?<h5>{passwordError}</h5>:""}
            </div>
        );
    }
}

export default InputContainer;