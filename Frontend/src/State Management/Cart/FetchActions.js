import axios from 'axios';
import api from '../../api/api-endpoints.json';
import { FETCHDATA,FETCHSUCCESS,FETCHERROR } from "./Actiontypes";
import {getCurrentUser, getJwt} from '../../services/LoginReg';

const fetch=()=>{
    return {
        type:FETCHDATA
    }
}

const success=(data)=>{
    return {
        type:FETCHSUCCESS,
        payload:data
    }
} 

const error=()=>{
    return {
        type:FETCHERROR
    }
} 

const fetchCartData=()=>{
    const {id}=getCurrentUser();
    return (dispatch)=>{
        dispatch(fetch());
        axios.get(`${api.userOperations}/cart/${id}`,{
            headers:{'Authorization': getJwt()}
        }).then(({data})=>{
            dispatch(success(data));
        }).catch(()=>{
            dispatch(error())
        })
    }
}

export {
    fetch,success,error,fetchCartData
};