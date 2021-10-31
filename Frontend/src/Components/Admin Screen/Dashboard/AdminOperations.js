import React, { Component } from 'react';
import {faUser,faShoppingCart,faBox,faExclamation} from '@fortawesome/free-solid-svg-icons';
import Lottie from 'lottie-react';
import loading from '../../../animations/loading.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class AdminOperations extends Component {
    state = {  }
    render() {
        const {revenue,revenueError,revenueLoading,noOfOrders,noOfOrdersLoading,noOfOrdersError,noOfUsers,usersError,usersLoading,noOfProductsLoading,noOfProducts,noOfProductsError}=this.props;
        return (
            <>
                <div className="admin-control-div">
                    <div>
                        <FontAwesomeIcon className="user-icon" icon={faUser}/>
                        <h2>Users</h2>
                    </div>
                    <div>
                    {usersLoading? 
                        <Lottie className="admin-operation-user-loading" animationData={loading} />:
                        usersError? <h1><FontAwesomeIcon className="faExclamation" icon={faExclamation}/></h1>:
                        <h1 className="no-of1">{noOfUsers}</h1>
                    }
                    </div>
                </div>
                <div className="admin-control-div">
                    <div>
                        <FontAwesomeIcon className="shopping-icon" icon={faShoppingCart}/>
                        <h2>Orders</h2>
                    </div>
                    {noOfOrdersLoading? 
                        <Lottie className="admin-operation-user-loading" animationData={loading} />:
                        noOfOrdersError? <h1><FontAwesomeIcon className="faExclamation" icon={faExclamation}/></h1>:
                        <h1 className="no-of2">{noOfOrders}</h1>
                    }
                </div>
                <div className="admin-control-div">
                    <div>
                        <FontAwesomeIcon className="product-icon" icon={faBox}/>
                        <h2>Products</h2>
                    </div>
                    {noOfProductsLoading? 
                        <Lottie className="admin-operation-user-loading" animationData={loading} />:
                        noOfProductsError? <h1><FontAwesomeIcon className="faExclamation" icon={faExclamation}/></h1>:
                        <h1 className="no-of3">{noOfProducts}</h1>
                    }
                </div>
                <div className="admin-control-div">
                    <div>
                        <FontAwesomeIcon className="amount-icon" icon={faBox}/>
                        <h2>Total Revenue</h2>
                    </div>
                    {revenueLoading? 
                        <Lottie className="admin-operation-user-loading" animationData={loading} />:
                        revenueError? <h1><FontAwesomeIcon className="faExclamation" icon={faExclamation}/></h1>:
                        <h1 className="no-of4"><span>$</span> {revenue}<span>.00</span></h1>
                    }
                </div>

            </> 
        );
    }
}

export default AdminOperations;