import { createStore } from 'redux';
import allReducer from './Combine';
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

const countStore=createStore(allReducer,applyMiddleware(thunk));

export default countStore;