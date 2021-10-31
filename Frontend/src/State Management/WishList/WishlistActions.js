const WISHLIST_LOADING='WISHLIST_LOADING';
const WISHLIST_ERROR='WISHLIST_ERROR';
const WISHLIST_DATA='WISHLIST_DATA';
const WISHLIST_UPDATE_STARTED='WISHLIST_UPDATE_STARTED';
const WISHLIST_REMOVE='WISHLIST_REMOVE';
const WISHLIST_UPDATE_ERROR='WISHLIST_UPDATE_ERROR';
const WISHLIST_ALREADY_REMOVED='WISHLIST_ALREADY_REMOVED';
const WISHLIST_ERROR_REMOVE='WISHLIST_ERROR_REMOVE';

const getWishList=()=>{
    return {
        type:WISHLIST_LOADING
    }
}

const wishlistedData=(data)=>{
    return {
        type:WISHLIST_DATA,
        payload:data
    }
}

const wishlistError=()=>{
    return {
        type:WISHLIST_ERROR
    }
}

const wishlistRemove=(id)=>{
    return {
        type:WISHLIST_REMOVE,
        payload:id
    }
}
const wishlistUpdateStarted=()=>{
    return {
        type:WISHLIST_UPDATE_STARTED
    }
}
const wishlistUpdateError=()=>{
    return {
        type:WISHLIST_UPDATE_ERROR
    }
}

const wishlistAlreadyRemoved=(id)=>{
    return {
        type: WISHLIST_ALREADY_REMOVED,
        payload:id
    }
}

const removeError=()=>{
    return {
        type: WISHLIST_ERROR_REMOVE
    }
}

export {
    getWishList,
    wishlistError,
    wishlistedData,
    wishlistRemove,
    wishlistUpdateStarted,
    wishlistUpdateError,
    wishlistAlreadyRemoved,
    removeError,
    WISHLIST_LOADING,
    WISHLIST_ERROR,
    WISHLIST_DATA,
    WISHLIST_REMOVE,
    WISHLIST_UPDATE_ERROR,
    WISHLIST_UPDATE_STARTED,
    WISHLIST_ALREADY_REMOVED,
    WISHLIST_ERROR_REMOVE
}