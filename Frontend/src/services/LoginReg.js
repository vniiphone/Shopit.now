import jwtDecode from "jwt-decode";
import axios from "axios";
import { api_endpoints as API_ENDPOINT, formUrl as URL } from "../api/api";

function userLogin(email, password) {
  const header = {
    "Content-Type": "application/json",
    "user-email": email,
    "user-password": password,
  };

  return axios.post(
    `${URL(API_ENDPOINT.userApi)}/login`,
    {},
    {
      headers: header,
    }
  );
}

function userRegistration(register) {
  const { fullname, email, mobile, password } = register;
  const header = {
    "Content-Type": "application/json",
    "user-email": email,
    "user-password": password,
    "user-mobile": mobile,
    "user-fullname": fullname,
  };

  return axios.post(
    `${URL(API_ENDPOINT.userApi)}/register`,
    {},
    {
      headers: header,
    }
  );
}

// Storing JWT

const tokenName = "auth-token";
const cartToken = "cart";

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenName);
    return jwtDecode(jwt);
  } catch (e) {
    return null;
  }
}
function getJwt() {
  try {
    const jwt = localStorage.getItem(tokenName);
    return "Bearer " + jwt;
  } catch (ex) {}
}

function setJwt(jwt) {
  localStorage.setItem(tokenName, jwt);
}

function jwtExpirationChecker(expireDate) {
  const date = Date.now() / 1000;
  if (date >= expireDate) {
    localStorage.removeItem(tokenName);
    return false;
  }
  return true;
}

function removeJwt() {
  localStorage.removeItem(tokenName);
  localStorage.removeItem(cartToken);
  window.location = "/";
}

function rolesBasedAuth() {
  const user = getCurrentUser();
  if (user) {
    const roles = user.roles;
    if (roles.includes("ADMIN")) return true;
    return false;
  } else return false;
}

export {
  getCurrentUser,
  userLogin,
  userRegistration,
  setJwt,
  jwtExpirationChecker,
  removeJwt,
  rolesBasedAuth,
  getJwt,
};
