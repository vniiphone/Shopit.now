import React, { Component } from 'react';

class AccountError extends Component {

    render() {
        const {error}=this.props;
        return (
            <div className="account-error">
                <h5>{error}</h5>            
            </div>
        );
    }
}

export default AccountError;