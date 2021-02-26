import axios from "axios";
import cookie from 'js-cookie';
import {
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  CART_NUM_CHANGE,
  REMOVE_FROM_CART,
  SAVE_SHIPPING,
  CLEAN_CART
} from "./types";


export const addToCartSuccess = (product, qty) => (dispatch) => {
  dispatch({
    type: ADD_TO_CART_SUCCESS,
    payload: {
      ...product,
      qty
    }
  });
};

export const addToCartFail = (error) => (dispatch) => {
  dispatch ({
    type: ADD_TO_CART_FAIL,
    payload: error
  });
};

export const addToCart = (productId, qty) => async (dispatch, getState) => {  
	try {
	  const { data: {_id, name, price, image, countInStock} } = await axios.get("/api/products/" + productId);
	  dispatch({
	    type: ADD_TO_CART_SUCCESS,
	    payload: {
	      _id,
		  countInStock,
          image,
		  name,
          price,
          qty
	    }
	  });
	  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
	} catch(error){
	  if (error.response) {
        const { data } = error.response;
        dispatch(addToCartFail(data));
      }
	}
};


export const cartNumChangeSuccess = (product, qty) => (dispatch) => {
  dispatch({
    type: CART_NUM_CHANGE,
    payload: {
      ...product,
      qty
    }
  });
};

export const cartNumChange = (productId, qty) => async (dispatch, getState) => {
    try {
	  const product = await axios.get("/api/products/" + productId);
      dispatch(cartNumChangeSuccess(product.data, qty));
      const {cart: { cartItems }} = getState();
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
	} catch(error){
	  if (error.response) {
        const { data } = error.response;
        dispatch(addToCartFail(data));
      }
	}
};

//
export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
	type: REMOVE_FROM_CART,
    payload: productId
  });
  const { cart: {cartItems} } = getState();
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

//

export const cleanCart = () => (dispatch) => {
    localStorage.setItem("cartItems", []);
    dispatch({
      type: CLEAN_CART
    });
};

export const saveShipping = (data) => (dispatch, getState) => {
    dispatch({
      type: SAVE_SHIPPING,
      payload: data
    });
    const {
      cart: { shipping },
    } = getState();
    localStorage.setItem("shipping", JSON.stringify(shipping));
};
