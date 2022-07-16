import axios from "axios";
import { FETCHDATA, FETCHSUCCESS, FETCHERROR } from "./Actiontypes";
import { getCurrentUser, getJwt } from "../../services/LoginReg";
import { api_endpoints as API_ENDPOINT, formUrl as URL } from "../../api/api";

const fetch = () => {
  return {
    type: FETCHDATA,
  };
};

const success = (data) => {
  return {
    type: FETCHSUCCESS,
    payload: data,
  };
};

const error = () => {
  return {
    type: FETCHERROR,
  };
};

const fetchCartData = () => {
  const { id } = getCurrentUser();
  return (dispatch) => {
    dispatch(fetch());
    axios
      .get(`${URL(API_ENDPOINT.userOperations)}/cart/${id}`, {
        headers: { Authorization: getJwt() },
      })
      .then(({ data }) => {
        dispatch(success(data));
      })
      .catch(() => {
        dispatch(error());
      });
  };
};

export { fetch, success, error, fetchCartData };
