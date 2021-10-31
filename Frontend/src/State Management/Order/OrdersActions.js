const ORDERS_LOAD='ORDERS_LOAD';
const ORDERS_ERROR='ORDERS_ERROR';
const ORDERS_DATA='ORDERS_DATA';


const orderLoading=()=>{
     return {
         type:ORDERS_LOAD
     }
 }

 const orderError=()=>{
    return {
        type:ORDERS_ERROR
    }
}

const orderData=(data)=>{
    return {
        type:ORDERS_DATA,
        payload:data
    }
}

export {
    ORDERS_LOAD,ORDERS_DATA,ORDERS_ERROR,orderLoading,orderError,orderData
}