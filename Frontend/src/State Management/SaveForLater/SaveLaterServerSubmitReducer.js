import { SAVE_LATER_SERVER_SUBMIT_SUCCESS,SAVE_LATER_SERVER_SUBMIT,SAVE_LATER_SERVER_SUBMIT_ERROR} from '../Cart/Actiontypes';

const initialState={
    loading:false,
    error:false,
    success:false
}

const SaveLaterServerSubmitReducer=(state=initialState,action)=>{
    switch(action.type){
        case SAVE_LATER_SERVER_SUBMIT:return {
            ...state,loading:true,error:false
        }
        case SAVE_LATER_SERVER_SUBMIT_SUCCESS:return {
            ...state,loading:false,success:true
        }
        case SAVE_LATER_SERVER_SUBMIT_ERROR:return {
            ...state,loading:false,error:true,success:false
        }
        default: return state;
    }
}

export default SaveLaterServerSubmitReducer;