import { combineReducers } from 'redux';
import {CartHandle} from './Cart/CartReducer'
import { saveForLaterReducer } from "./SaveForLater/SaveForLaterReducer";
import ServerSubmitReducer from './Cart/ServerSubmitReducer';
import SaveLaterServerSubmitReducer from "./SaveForLater/SaveLaterServerSubmitReducer";
import { paymentReducer } from "./Payment/PaymentRedux";
import {orderReducer} from './Order/OrdersReducer';
import { WishlistReducer } from "./WishList/WishListReducer";

const allReducer=combineReducers({
    CartOperations: CartHandle,
    SaveLater: saveForLaterReducer,
    CartServer:ServerSubmitReducer,
    SaveLaterServer:SaveLaterServerSubmitReducer,
    paymentBegan:paymentReducer,
    AllOrders:orderReducer,
    Wishlist:WishlistReducer
});

export default allReducer; 