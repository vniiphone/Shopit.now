import React, { Component } from 'react';
import Lottie from "lottie-react";
import loadingAnim from "../animations/dataload.json";
import emptyAnim from "../animations/empty-box.json";
import serverAnim from "../animations/server-error.json";
import { mapStateToProps,mapDispatchToProps } from "../State Management/MappingStates";
import { connect } from "react-redux";
import "../css/wishlist.css";
import { Link } from 'react-router-dom';

class Wishlist extends Component {
    state = { 
        loading:true,
        data:[],
        error:false,
        updateLoading:false,
        updateError:null,
        updateIndex:null,
        alreadyDeleted:false 
    }

    componentDidMount(){
        this.props.fetchWishlist();
    }

    componentDidUpdate(prevProps,prevState){
        if(prevProps.wishlist!==this.props.wishlist){
            const {loading,data,error,updateLoading,updateError}=this.props.wishlist;
            this.setState({loading,data,error,updateLoading,updateError});
            if(updateError){
                clearTimeout(this.errorTimer);
                this.manageError();
            }        
            if(updateLoading===false) this.setState({updateIndex:null});
        }
    }

    manageError=()=>{
        this.errorTimer=setTimeout(()=> this.props.removeTheError(),6000);
    }

    componentWillUnmount(){
        this.props.removeTheError();
        clearTimeout(this.errorTimer);
    }

    handleRemove=(id,index)=>{
        this.setState({updateIndex:index});
        this.props.removeFromWishlist(id);
    }

    closeUpdateError=()=>{
        this.props.removeTheError();
        clearTimeout(this.errorTimer)
    }

    handleToCart=(item,index)=>{
        this.setState({updateIndex:index});
        this.props.moveWishlistToCart(item);
    }

    routeToProduct=(id)=>{
        return this.props.history.push(`products/${id}`);
    }

    render() {

        const {loading,error,data,updateLoading,updateError,updateIndex} =this.state;
        return (
            <div className="wishlist-container">
                <h1>Your Wishlist</h1>
                {loading?
                    <div className="loading-anim">
                        <Lottie animationData={loadingAnim}/>
                    </div>:
                    error ?
                    <div className="error-anim">
                        <Lottie loop={false} animationData={serverAnim}/>
                        <h5>Server error occured. Try again later</h5>
                    </div>:
                    data.length===0?
                    <div className="empty-anim">
                        <Lottie loop={false} animationData={emptyAnim}/>
                        <h5>Nothing in the Wishlist</h5>
                    </div>:
                    <div className="wishlist-sub-container">
                        {data.map((i,index)=>{
                            const imgUrl=`data:${i.thumbnail.type};base64,${i.thumbnail.picByte}`;
                            return (
                                <div className="wishlist-item-container" key={index} >
                                    {(updateLoading && updateIndex===index )&&  <div className="update-loading" /> }
                                    <div className="image-container">
                                        <img onClick={()=>this.routeToProduct(i.pid)} src={imgUrl} alt={i.name}/>
                                        {!i.available &&<div className="not-available">
                                            <span>Out of Stock</span>
                                        </div> }
                                    </div>
                                    <Link className="wishlist-to-product" to={`products/${i.pid}`} ><h4>{i.name}</h4></Link>
                                    <h3>$ <span>{i.price}</span>.00</h3>
                                    <div className="wishlist-btn-container">
                                        <button disabled={updateLoading?true:!i.available?true:false} onClick={()=>this.handleToCart(i,index)} id="btn-add">Add to Cart</button>
                                        <button disabled={updateLoading} onClick={()=>this.handleRemove(i.wid,index)} id="btn-remove">Remove from Wishlist</button>
                                    </div>
                                </div>
                        )})}
                    </div>
                }
                {updateError && <div className="wishlist-update-error">
                    <button onClick={this.closeUpdateError} className="close-btn">X</button>
                    <h5>{updateError}</h5>
                </div>}
            </div>
                    
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Wishlist);