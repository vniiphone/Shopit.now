import React, { Component } from 'react'
import Lottie from "lottie-react";
import searchEmpty from "../../animations/searchEmpty.json";

export default class SearchEmpty extends Component {
    render() {
        const {query} =this.props;
        return (
            <div className="search-empty">
                <Lottie animationData={searchEmpty} />
                <h2>No results for {query}</h2>
            </div>
        )
    }
}
