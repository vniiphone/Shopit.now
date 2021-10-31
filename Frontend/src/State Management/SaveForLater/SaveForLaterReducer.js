import axios from "axios";
import { MOVE_TO_CART,REMOVE_FROM_SAVE_LATER,FETCH_SAVE_LATER_DATA,FETCH_SAVE_LATER_SUCCESS,FETCH_SAVE_LATER_ERROR, MOVE_TO_SAVE_LATER } from "../Cart/Actiontypes";
import { removeFromSaveLater,fetchSaveLater,fetchSaveLaterSuccess,fetchSaveLaterError,moveToSaveLater } from "./SaveForLaterActions";
import { saveLaterSubmitToServer,saveLaterSubmitError,saveLaterSubmitSuccess } from "./SaveLaterServerSubmitActions";
import { submitToServer,serverError,serverSuccess } from '../Cart/ServerSubmitActions';
import { getJwt, getCurrentUser } from "../../services/LoginReg";
import { moveToCart, removeFromCart } from "../Cart/CartActions";
import api from '../../api/api-endpoints.json';

const initialState={
    loading:false,
    items:[],
    error:false
}

const saveForLaterReducer=(state=initialState,action)=>{
    switch(action.type){

        case FETCH_SAVE_LATER_DATA: return {
            ...state,loading:true,error:false
        }

        case  FETCH_SAVE_LATER_SUCCESS: return {
            ...state,loading:false,items:[...action.payload]
        }

        case  FETCH_SAVE_LATER_ERROR: return {
            ...state,loading:false,error:true
        }

        case MOVE_TO_SAVE_LATER :
            const exists=state.items.some(i=>i.productId===action.payload.productId);
            if(exists){
                const updated=moveToSaveLaterUI(state.items,action.payload);
                return {...state,item:[...updated]};
            }else return {
                ...state,items:[...state.items,action.payload]
        }
        
        case MOVE_TO_CART: 
            return {...state,items:[...removeFromSaveLaterUI(state.items,action.payload)]
        };

        case REMOVE_FROM_SAVE_LATER: return {
            ...state,items:[...removeFromSaveLaterUI(state.items,action.payload)]
        }

        default: return state;
    }
}
 
const fetchSaveForLater=()=>{
    const {id}=getCurrentUser();
    return (dispatch)=>{
        dispatch(fetchSaveLater());
        axios.get(`${api.userSaveLater}/${id}`,{
            headers:{
                'Authorization':getJwt()
            }
        }).then(({data})=>{
            dispatch(fetchSaveLaterSuccess(data));
        }).catch(()=>{
            dispatch(fetchSaveLaterError());
        })
    }
}

const removeFromSaveLaterServer=(productId)=>{
    const {id}=getCurrentUser();
    return (dispatch)=>{
        dispatch(saveLaterSubmitToServer());
        axios.delete(`${api.userSaveLater}/remove/${id}/${productId}`,{
            headers:{
                'Authorization':getJwt()
            }
        }
        ).then(()=>{
            dispatch(removeFromSaveLater(productId));
            dispatch(saveLaterSubmitSuccess());
        }).catch(()=>{
            dispatch(saveLaterSubmitError());
        })
    }   
}

const removeFromSaveLaterUI=(items,id)=>{
    const updated=items.filter(i=>i.productId!==id);
    return updated;
}

const moveToSaveLaterUI=(saveLater,item)=>{
    const updated=saveLater.map(i=>{
        if(i.productId===item.productId){
            i.itemCount+=item.itemCount;
            i.totalPrice=parseInt(i.totalPrice)+parseInt(item.totalPrice);
            return i;
        }return i;
    });
    return updated;
}

const addToSaveLaterServer=(item)=>{
    const {productId,productName,totalPrice,itemCount}=item;
    const {id}=getCurrentUser();
    return (dispatch)=>{
        dispatch(submitToServer());
        axios.post(`${api.userSaveLater}/add/${id}`,{productId,productName,totalPrice,itemCount},
        {headers:{'Authorization':getJwt()}
        }).then(()=>{
            dispatch(moveToSaveLater(item));
            dispatch(removeFromCart(productId));
            dispatch(serverSuccess());
        }).catch(()=>{
            dispatch(serverError());
        })
    }
}

const addBackToCart=(item)=>{
    const {productId,productName,totalPrice,itemCount}=item;
    const {id}=getCurrentUser();
    return (dispatch)=>{
        dispatch(saveLaterSubmitToServer());
         axios.post(`${api.userCart}/back-to-cart/${id}`,{productId,productName,totalPrice,itemCount},
        {headers:{'Authorization':getJwt()}
        }).then(()=>{
            dispatch(moveToCart(item));
            dispatch(removeFromSaveLater(productId));
            dispatch(saveLaterSubmitSuccess());
        }).catch(()=>{
            dispatch(saveLaterSubmitError());
        })
    }
}


export { 
    saveForLaterReducer,
    fetchSaveForLater,
    removeFromSaveLaterServer,
    addToSaveLaterServer,
    addBackToCart 
};