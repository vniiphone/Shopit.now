import React, { Component } from 'react';
import {connect} from 'react-redux';
import BtnContainer from '../../Components/Order Process/BtnContainer';
import Lottie from 'lottie-react';
import loadingIcon from '../../animations/loading.json';
import { mapStateToProps,mapDispatchToProps } from '../../State Management/MappingStates';

class OrderSuccess extends Component {
    
    state={
        cart:[],
        loading:false,
        totalPayable:0,
        serverLoading:false,
        serverError:false,
        serverSuccess:false,
    }

    componentDidMount(){
        const {setProgress}=this.props;
        setProgress(2);
        this.getCart();
    }

    componentDidUpdate(prevProps,prevState){
        const {paymentBegan,orderCompleted,clearCart}=this.props;
        if(prevProps.paymentBegan!==paymentBegan){
            const{serverLoading,serverError,serverSuccess,fromWhere}=paymentBegan;
            if(serverSuccess){
                orderCompleted();
                if(fromWhere==="CART"){
                    clearCart("CART");
                }
                this.props.history.replace("/order-placed");
            }
            this.setState({serverError,serverLoading,serverSuccess});
        }
    }

    getCart=()=>{
        const {paymentBegan}=this.props;
        const cart=paymentBegan.orders;
        let totalPayable=0;
        cart.forEach(i=>totalPayable+=parseInt(i.totalPrice));
        if(cart.length)
            this.setState({cart,loading:true,totalPayable});
    }

    componentWillUnmount(){
        const {setProgress}=this.props;
        setProgress(1);
    }
    
    handleContinue=()=>{
        const {orders,paymentMode,paymentAddress} =this.props.paymentBegan;
        const {addressDetails}=paymentAddress;
        const {houseNo,town,city,state,pincode}=addressDetails;
        const submitData= 
            orders.map(i=>{
                const itemDetails={
                    productName: i.productName,
                    productId: i.productId,
                    itemCount: i.itemCount,
                    totalPrice: i.totalPrice
                }
                const modeOfPayment={
                    modeOfPayment:paymentMode
                }
                const billingAddress={
                    address: `${houseNo}, ${town}, ${city}, ${state}, ${pincode}`
                }
                return {
                    itemDetails,modeOfPayment,billingAddress
                };
            });
        this.props.submitOrders(submitData);
        
    }

    handleGoBack=()=>{
        this.props.history.replace("/order-processing/payment");
    }
    render() {
        const {serverLoading,serverSuccess,serverError,cart,loading,totalPayable}=this.state;
        return (
            <div className="order-sucess-container">
                <div className={`order-server-error ${serverError?"server-error-display":""}`}>Couldn't submit the order. Try again.</div>
                <h2>Order Confirmation</h2>
                {(serverLoading || serverSuccess) && <div className="order-success-cover">
                    <Lottie animationData={loadingIcon} className="order-success-loading"/>
                </div>}
                {!loading ? 
                    <Lottie animationData={loadingIcon} className="order-data-loading"/>:
                    <div>
                        <h3>Items:</h3>
                        <div className="order-sucess-item-details-container">
                            {cart.map((i,index)=>(
                                <div key={index} className="order-success-item-details">
                                    <span>{(i.productName).toLowerCase()}</span>
                                    <span>X {i.itemCount}</span>
                                    <span>$ {i.totalPrice}</span>
                                </div>
                            ))}
                        </div>
                        <div className="amount-payable">
                            <span>Total Price:</span>
                            <span>$ {totalPayable}.0</span>
                        </div>
                        <BtnContainer 
                            disableBack={(serverLoading || serverSuccess)?true:false}
                            disable={(serverLoading || serverSuccess)?true:false}
                            disableBtn={(serverLoading || serverSuccess)?"disable-continue-btn":""}
                            handleContinue={this.handleContinue}
                            handleGoBack={this.handleGoBack}
                        />

                    </div>
                }
            </div>
        );
    }
}

export default connect( mapStateToProps,mapDispatchToProps )(OrderSuccess);