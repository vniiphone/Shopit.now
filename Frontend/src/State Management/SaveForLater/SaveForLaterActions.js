import { MOVE_TO_CART,REMOVE_FROM_SAVE_LATER,FETCH_SAVE_LATER_DATA,FETCH_SAVE_LATER_SUCCESS,FETCH_SAVE_LATER_ERROR,MOVE_TO_SAVE_LATER } from "../Cart/Actiontypes";

const fetchSaveLater=()=>{
    return {
        type:FETCH_SAVE_LATER_DATA
    }
}

const fetchSaveLaterSuccess=(data)=>{
    return {
        type:FETCH_SAVE_LATER_SUCCESS,
        payload:data
    }
} 
 
const fetchSaveLaterError=()=>{
    return {
        type:FETCH_SAVE_LATER_ERROR
    }
}

const moveToCart=(data)=>{
    return{
        type:MOVE_TO_CART,
        payload:data
    }
}

const moveToSaveLater=(data)=>{
    return{
        type:MOVE_TO_SAVE_LATER,
        payload:data
    }
}

const removeFromSaveLater=(id)=>{
    return{
        type:REMOVE_FROM_SAVE_LATER,
        payload:id
    }
}

export {
    moveToCart,removeFromSaveLater,moveToSaveLater,
    fetchSaveLater,fetchSaveLaterError,fetchSaveLaterSuccess
}