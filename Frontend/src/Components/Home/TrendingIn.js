import React, { Component } from 'react';
import adidas from "../../Images/logo/adidas.jpeg";
import louis from "../../Images/logo/louis.png";
import hm from "../../Images/logo/hm.png";
import allen from "../../Images/logo/allen.jpeg";
import wrogn from "../../Images/logo/wrogn.jpg";
import nike from "../../Images/logo/nike.png";
import roadster from "../../Images/logo/roadster.jpeg";
import hrx from "../../Images/logo/hrx.jpg";
import '../../css/trending-in.css';
import { Link } from 'react-router-dom';

const images = [adidas, louis, hm, allen, wrogn, nike, roadster, hrx];

class TrendingIn extends Component {

    render() {
        return (
            <div className="trending-in-container">
                <h2>Trending Brands in Fashion</h2>
                <div className="trending-in">
                    {images.map((item, index) =>
                        <div className="trending-home-container" key={index}>
                            <Link to="/search/fashion"><img src={item} alt={item} /></Link>
                        </div>
                    )}
                </div>
            </div>

        );
    }
}

export default TrendingIn;