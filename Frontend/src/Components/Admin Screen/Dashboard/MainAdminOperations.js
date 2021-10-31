import { Component } from 'react';
import api from '../../../api/api-endpoints.json';
import axios from 'axios';
import {getJwt} from '../../../services/LoginReg';

class MainAdminOperations extends Component {

    state = { 
        //products
        noOfProducts:0,
        noOfProductsLoading:false,
        noOfProductsError:false,
        //users
        noOfUsers:0,
        users:[],
        usersLoading:false,
        usersError:false,
        //orders
        noOfOrders:0,
        noOfOrdersLoading:false,
        noOfOrdersError:false, 
        //revenue
        revenue:0,
        revenueLoading:false,
        revenueError:false

     }
    
    componentDidMount(){
        this.props.handleSelectedScreen("Dashboard");
        this.getAllUsers();
        this.noOfProducts();
        this.getNoOfOrders();
        this.getRevenue();
    }

    noOfProducts=async()=>{
        this.setState({noOfProductsLoading:true,noOfProductsError:false});
        await axios.get(`${api.productApi}/view/no-of-products`,{
            headers:{
                'Authorization':getJwt()
            }
        }).then(({data})=>{
            this.setState({noOfProducts:data,noOfProductsLoading:false});
        }).catch(()=>{
            this.setState({noOfProductsError:true,noOfProductsLoading:false});
        })
    }

    getAllUsers=async()=>{
        this.setState({usersLoading:true,usersError:false});
        await axios.get(`${api.adminApi}/all-users`,{
            headers:{
                'Authorization':getJwt()
            }
        }).then(({data})=>{
            this.setState({users:data,noOfUsers:data.length,usersLoading:false});
        }).catch(()=>{
            this.setState({usersError:true,usersLoading:false});
        })
    }

    getNoOfOrders=async()=>{
        this.setState({noOfOrdersLoading:true,noOfOrdersError:false});
        await axios.get(`${api.userOrders}/no-of`,{
            headers:{
                'Authorization':getJwt()
            }
        }).then(({data})=>{
            this.setState({noOfOrdersLoading:false,noOfTrending:data.length,noOfOrders:data});
        }).catch(()=>{
            this.setState({noOfOrdersLoading:false,noOfOrdersError:true});
        })
    }

    getRevenue=async()=>{
        this.setState({revenueLoading:true,revenueError:false});
        await axios.get(`${api.userOrders}/revenue`,{
            headers:{
                'Authorization':getJwt()
            }
        }).then(({data})=>{
            this.setState({revenue:data,revenueLoading:false});
        }).catch(()=>{
            this.setState({revenueError:true,revenueLoading:false});
        })
    }

}

export default MainAdminOperations;