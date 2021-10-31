import React, { Component } from 'react'
import ProductStars from "../Item Screen/ProductStars";

const stars=[4,3,2,1];

class RatingFilter extends Component{

    render(){
        const {handleRating} =this.props;
        return (
            <div className="filter-rating-container">
                <h5>Ratings</h5>
                {stars.map((i,index)=>(
                    <div onClick={()=>handleRating(i,1)} className="filter-rating" key={index}>
                        <ProductStars 
                            rating={i}
                            starRatedColor="orange"
                            numberOfStars={5}
                            starDimension="20px"
                            starSpacing="1px" 
                        />
                        <span>& above</span>
                    </div>
                ))}
            </div>
        )
    }
}

export default RatingFilter;