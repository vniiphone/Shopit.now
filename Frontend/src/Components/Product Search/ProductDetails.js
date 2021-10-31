import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';

class ProductDetails extends Component {

    render() {

        const { data,handleProduct } = this.props;
        const {thumbnail,name,id,rating,amount,raters,available,trending}=this.props.data;
        const imgUrl=`data:${thumbnail.type};base64,${thumbnail.picByte}`;
        return (
            <div onClick={()=>handleProduct(id)} className="each-search">
                {( trending && available ) && <span className="product-is-trending">Trending</span>}
                { !available && <div className="not-available">
                    <span>Out of Stock</span>
                </div> }
                <div className="search-image">
                    <img src={imgUrl} alt={name} />
                </div>
                <h5>{data.name}</h5>
                <div className="star-rating">
                    <StarRatings
                        starRatedColor="orange"
                        rating={rating}
                        numberOfStars={5}
                        starDimension="15px"
                        starSpacing="0px" />
                    {raters!==0 && <span>{raters}</span>}
                </div>
                <h4><span>$ </span>{amount}</h4>
            </div>
        );
    }
}

export default ProductDetails;