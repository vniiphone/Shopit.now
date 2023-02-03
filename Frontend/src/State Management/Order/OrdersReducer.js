import axios from "axios";
import { getJwt } from "../../services/LoginReg";
import {
  ORDERS_LOAD,
  ORDERS_DATA,
  ORDERS_ERROR,
  orderLoading,
  orderError,
  orderData,
} from "./OrdersActions";
import { api_endpoints as API_ENDPOINT, formUrl as URL } from "../../api/api";

const initialState = {
  loading: false,
  error: false,
  data: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDERS_LOAD:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ORDERS_DATA:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case ORDERS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

const getOrders = () => {
  return (dispatch) => {
    dispatch(orderLoading());
    axios
      .get(`${URL(API_ENDPOINT.userOrders)}/for-admin`, {
        headers: {
          Authorization: getJwt(),
        },
      })
      .then(({ data }) => {
        dispatch(orderData(data));
      })
      .catch(() => {
        dispatch(orderError());
      });
  };
};

export { orderReducer, getOrders };
