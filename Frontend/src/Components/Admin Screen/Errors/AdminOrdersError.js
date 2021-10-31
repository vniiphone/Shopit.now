import React, { Component } from 'react';

class AdminOrdersError extends Component {
    render() {
        const {error}=this.props;
        return (
            <div className="admin-orders-errors">
                {error}
            </div>
        );
    }
}

export default AdminOrdersError;