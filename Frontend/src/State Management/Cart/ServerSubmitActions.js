import { SERVER_SUBMIT,SERVER_SUBMIT_ERROR,SERVER_SUBMIT_SUCCESS } from "./Actiontypes";

const submitToServer=()=>{
    return {
        type:SERVER_SUBMIT
    }
}

const serverError=()=>{
    return {
        type:SERVER_SUBMIT_ERROR
    }
}

const serverSuccess=()=>{
    return {
        type:SERVER_SUBMIT_SUCCESS
    }
}
 
export {
    submitToServer,
    serverError,
    serverSuccess
}