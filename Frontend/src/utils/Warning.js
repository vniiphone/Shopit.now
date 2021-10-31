import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

class Warning extends Component {

    render() {
        return (
            <FontAwesomeIcon className="warning-icon" icon={faExclamationCircle} />
        );
    }
}

export default Warning;