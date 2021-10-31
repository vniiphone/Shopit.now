import React, { Component } from 'react';
import axios from 'axios';
import DataLoad from '../../Errors/DataLoad';
import NetworkError from '../../Errors/NetworkError';
import EmptyMsg from '../../Errors/EmptyMsg';
import api from "../../../../api/api-endpoints.json";
import { getJwt } from "../../../../services/LoginReg";
import '../../../../css/trending-admin.css';

class TrendingAdmin extends Component {
    state = { 
        loading:false,
        error:false,
        data:[]
     }

     componentDidMount(){
         this.getTrending();
     }
     getTrending=async()=>{
        this.setState({loading:true,error:false});
        await axios.get(`${api.userOperations}/trending`,{
            headers:{
                'Authorization':getJwt()
            }
        }).then(({data})=>{
            this.setState({data,loading:false});
        }).catch(()=>{
            this.setState({error:true,loading:false});
        })
    }
    render() {
        const {loading,error,data}=this.state;
        return (
            <div className="trending-admin-container">
                <h1>Trending Products</h1>
                {loading ? <DataLoad/>:error? <NetworkError/>:(!data.length)?<EmptyMsg msg="No Trending Products"/>:
                <>
                    <div className="trending-header">
                        <h5>Product</h5>
                        <h5>Stock</h5>
                    </div>
                    <div className="trending-admin-container-datas">
                        {data.map((i,index)=>(
                            <div key={index} className="trending-data">
                                <h4>{(i.name).toLowerCase()}</h4>
                                <h4>{i.stock}</h4>
                            </div>
                        ))}
                    </div>
                </>}
            </div>
        );
    }
}

export default TrendingAdmin;