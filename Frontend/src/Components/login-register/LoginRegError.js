import React, { Component } from 'react';
import { faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class LoginRegError extends Component {
    render() {
        const {error}=this.props;
        return (
            <div className="registration-login-error">
                <FontAwesomeIcon className="registration-login-error-icon" icon={faExclamationTriangle}/>
                <h5>{error}</h5>
            </div>
        );
    }
}

export default LoginRegError;