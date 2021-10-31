import React, { Component } from 'react';
import ProductStars from './ProductStars';


class ProductDetails extends Component {
    
    render() {

        const {overallRating,product,...rest}=this.props;

        return (
            <>
                <div className="details-container">
                    <h2 >{product.title}</h2>
                    <h3>$ {product.price}</h3>
                    <ProductStars 
                        rating={overallRating}
                        numberOfStars={5}
                        starRatedColor="orange"
                        {...rest}
                    />
                </div>
               
            </>
        );
    }
}

export default ProductDetails;