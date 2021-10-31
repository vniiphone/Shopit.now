import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';

class ProductStars extends Component {
    
    render() {
        const {...rest}=this.props;
        return (
            <StarRatings
                name='rating'
                {...rest}
          />
        );
    }
}

export default ProductStars;