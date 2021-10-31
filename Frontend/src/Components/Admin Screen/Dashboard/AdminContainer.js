import React from 'react';
import AdminOperations from './AdminOperations';
import MainAdminOperations from './MainAdminOperations';
import NewOrders from './Orders/NewOrders';
import Users from './Users/Users';
import TrendingAdmin from './Trending/TrendingAdmin';
import '../../../css/admin.css';

class AdminContainer extends MainAdminOperations {

    handleClick=(url)=>{ 
        this.props.history.push(`/admin${url}`);
    }
    render() {
        const {revenue,revenueError,revenueLoading,noOfOrders,noOfOrdersLoading,noOfOrdersError
            ,users,usersError,usersLoading,noOfUsers,noOfProductsLoading,noOfProducts,noOfProductsError}=this.state;
        return (
            <div className="admin-full-container">
    
                <div className="admin-container">
                    <div className="admin-controls">
                        <AdminOperations 
                            noOfUsers={noOfUsers}
                            noOfProducts={noOfProducts}
                            noOfProductsLoading={noOfProductsLoading}
                            noOfProductsError={noOfProductsError}
                            usersLoading={usersLoading}
                            usersError={usersError}
                            noOfOrders={noOfOrders}
                            noOfOrdersLoading={noOfOrdersLoading}
                            noOfOrdersError={noOfOrdersError}
                            revenue={revenue}
                            revenueLoading={revenueLoading}
                            revenueError={revenueError}
                        />
                    </div>
                </div>
                <div>
            </div>
            <div className="admin-user-controls">
                <Users data={users} loading={usersLoading} error={usersError} />
                <TrendingAdmin/>
            </div>
            <NewOrders/>
        </div>
    );
    }
}

export default AdminContainer;