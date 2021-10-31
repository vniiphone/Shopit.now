import { SERVER_SUBMIT,SERVER_SUBMIT_ERROR, SERVER_SUBMIT_SUCCESS } from './Actiontypes';

const initialState={
    loading:false,
    error:false,
    success:false
}

const ServerSubmitReducer=(state=initialState,action)=>{
    switch(action.type){
        case SERVER_SUBMIT:return {
            ...state,loading:true,error:false
        }
        case SERVER_SUBMIT_SUCCESS:return {
            ...state,loading:false,success:true
        }
        case SERVER_SUBMIT_ERROR:return {
            ...state,loading:false,error:true,success:false
        }
        default: return state;
    }
}

export default ServerSubmitReducer;