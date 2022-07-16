import axios from "axios";
import {
  WISHLIST_ERROR_REMOVE,
  WISHLIST_DATA,
  WISHLIST_ERROR,
  WISHLIST_REMOVE,
  WISHLIST_UPDATE_STARTED,
  WISHLIST_UPDATE_ERROR,
  WISHLIST_LOADING,
  WISHLIST_ALREADY_REMOVED,
  wishlistAlreadyRemoved,
  wishlistUpdateError,
  wishlistUpdateStarted,
  wishlistRemove,
  wishlistedData,
  wishlistError,
  getWishList,
} from "./WishlistActions";
import { api_endpoints as API_ENDPOINT, formUrl as URL } from "../../api/api";
import { getJwt, getCurrentUser } from "../../services/LoginReg";
import { addItem } from "../Cart/CartReducer";

const initialState = {
  loading: true,
  error: false,
  data: [],
  updateLoading: false,
  updateError: null,
};

const WishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case WISHLIST_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case WISHLIST_DATA:
      return {
        ...state,
        loading: false,
        data: [...action.payload],
      };
    case WISHLIST_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case WISHLIST_UPDATE_STARTED:
      return {
        ...state,
        updateLoading: true,
        updateError: null,
      };
    case WISHLIST_UPDATE_ERROR:
      return {
        ...state,
        updateLoading: false,
        updateError: "Server error occured. Try after sometime.",
      };
    case WISHLIST_REMOVE:
      return {
        ...state,
        updateLoading: false,
        data: updateData(state.data, action.payload),
      };
    case WISHLIST_ALREADY_REMOVED:
      return {
        ...state,
        updateError: "Wishlist already removed",
        data: updateData(state.data, action.payload),
        updateLoading: false,
      };
    case WISHLIST_ERROR_REMOVE:
      return {
        ...state,
        updateError: null,
      };
    default:
      return state;
  }
};

const updateData = (data, id) => {
  const updated = data.filter((i) => i.wid !== id);
  return updated;
};

const getWishlist = () => {
  const { id } = getCurrentUser();
  return (dispatch) => {
    dispatch(getWishList());
    axios
      .get(`${URL(API_ENDPOINT.userOperations)}/wishlist/${id}`, {
        headers: {
          Authorization: getJwt(),
        },
      })
      .then(({ data }) => {
        dispatch(wishlistedData(data));
      })
      .catch(() => {
        dispatch(wishlistError());
      });
  };
};

const removeWishlist = (wid) => {
  const { id } = getCurrentUser();
  return (dispatch) => {
    dispatch(wishlistUpdateStarted());
    axios
      .delete(`${URL(API_ENDPOINT.userOperations)}/wishlist/${id}/${wid}`, {
        headers: {
          Authorization: getJwt(),
        },
      })
      .then(() => {
        dispatch(wishlistRemove(wid));
      })
      .catch(() => {
        dispatch(wishlistUpdateError());
      });
  };
};

const wishlistToCart = (item) => {
  const { pid, price, name, wid } = item;
  const { id } = getCurrentUser();
  return (dispatch) => {
    dispatch(wishlistUpdateStarted());
    axios
      .post(
        `${URL(
          API_ENDPOINT.userOperations
        )}/wishlist/to-cart/${id}/${pid}/${wid}`,
        null,
        {
          headers: {
            Authorization: getJwt(),
          },
        }
      )
      .then(() => {
        const item = {
          id: 1,
          productId: pid,
          productName: name,
          totalPrice: price,
          itemCount: 1,
        };
        dispatch(addItem(item));
        dispatch(wishlistRemove(wid));
      })
      .catch(({ request }) => {
        if (request.status === 400) dispatch(wishlistAlreadyRemoved(wid));
        else dispatch(wishlistUpdateError());
      });
  };
};

export { WishlistReducer, getWishlist, removeWishlist, wishlistToCart };
