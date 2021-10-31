import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api  from "../../api/api-endpoints.json";
import '../../css/advertisement.css';

class Advertisement extends Component {
    
    state = { 
        displaying:null
    }

    componentDidMount(){
        this.getAdvertisements()
    }

    async getAdvertisements(){
        await axios.get(`${api.productApi}/view/advertisements-speci`)
        .then(({data})=>{
            this.setState({displaying:data});
        }).catch(()=>{})
    }

    render() {
        const {displaying}=this.state;
        if(!displaying) return "";
        const {productId,type,picByte}=displaying;
        const imgUrl=`data:${type};base64,${picByte}`;
        return (
            <div className="ad-container">
                <Link to={`products/${productId}`}><img src={imgUrl} alt="advertisement"/></Link>
            </div>

        );
    }
}

export default Advertisement;