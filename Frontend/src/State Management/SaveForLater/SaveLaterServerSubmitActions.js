import { SAVE_LATER_SERVER_SUBMIT,SAVE_LATER_SERVER_SUBMIT_ERROR,SAVE_LATER_SERVER_SUBMIT_SUCCESS } from "../Cart/Actiontypes";

const saveLaterSubmitToServer=()=>{
    return {
        type:SAVE_LATER_SERVER_SUBMIT
    }
}

const saveLaterSubmitError=()=>{
    return {
        type:SAVE_LATER_SERVER_SUBMIT_ERROR
    }
}

const saveLaterSubmitSuccess=()=>{
    return {
        type:SAVE_LATER_SERVER_SUBMIT_SUCCESS
    }
}
 
export {
    saveLaterSubmitError,
    saveLaterSubmitToServer,
    saveLaterSubmitSuccess
}