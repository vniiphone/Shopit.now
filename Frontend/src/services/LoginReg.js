import api from '../api/api-endpoints.json';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

 function userLogin(email,password){
    return axios.post(`${api.userApi}/login`,{email,password});
}

 function userRegistration(register){
    return axios.post(`${api.userApi}/register`,register);
}

// Storing JWT 

const tokenName="auth-token";
const cartToken="cart"

function getCurrentUser(){
    try{
        const jwt=localStorage.getItem(tokenName);
        return jwtDecode(jwt);
    }catch(e){
        return null;
    }
}
function getJwt(){
    try{
        const jwt= localStorage.getItem(tokenName);
        return "Bearer "+jwt;
    }catch(ex){}
}

function setJwt(jwt){
    localStorage.setItem(tokenName,jwt);
}

function jwtExpirationChecker(expireDate){
    const date=Date.now()/1000;
    if(date>=expireDate){
        localStorage.removeItem(tokenName);
        return false;
    }
    return true;
}

function removeJwt(){
    localStorage.removeItem(tokenName);
    localStorage.removeItem(cartToken);
    window.location="/";
}

function rolesBasedAuth(){
    const user=getCurrentUser();
    if(user){
        const roles=user.roles;
        if(roles.includes("ADMIN"))
            return true;
        return false;
    }else return false;
}

export {
    getCurrentUser,
    userLogin,
    userRegistration,
    setJwt,
    jwtExpirationChecker,
    removeJwt,
    rolesBasedAuth,
    getJwt
}