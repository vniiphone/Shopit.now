import React, { Component } from 'react';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { Link } from 'react-router-dom';
import '../css/not-found.css';

class NotFound extends Component {
    state = {  }
    render() {
        return (
            <>
                <div className="not-found-container">
                    <h1>
                        <SentimentVeryDissatisfiedIcon className="not-found-icon"/>
                    </h1>
                <h2>Page Not Found</h2>
                <p>Uh oh, we can't seem to find the page you're looking for.</p>
                    <h3><Link className="go-home" to="/">Go Home</Link></h3>
                </div>
            </>
        );
    }
}

export default NotFound;