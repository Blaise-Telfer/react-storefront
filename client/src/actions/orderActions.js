import axios from "axios";
import { 
  ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL,
  MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, 
  ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL
} from "./types";


//create an order
export const createOrder = (order) => async (dispatch, getState) => {
  try {
	const { authInfo: { authToken } } = getState();
	dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    const { data: { data: newOrder } } = await axios.post("/api/orders", 
	  order,
	  {headers: {Authorization: authToken} }
	);
	dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.response.data });
  }
}

//list user's orders
export const listMyOrders = () => async (dispatch, getState) => {
  try {
    const { authInfo: { authToken } } = getState();
	dispatch({ type: MY_ORDER_LIST_REQUEST });
    const { data } = await axios.get("/api/orders/mine",
	  {headers: {Authorization: authToken} }
	);
    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
  }
}

//list all orders
export const listOrders = () => async (dispatch, getState) => {
  try {
    const { authInfo: { authToken } } = getState();
	dispatch({ type: ORDER_LIST_REQUEST });
    const { data } = await axios.get("/api/orders",
	  {headers: {Authorization: authToken} }
	);
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_LIST_FAIL, payload: error.response.data });
  }
}

//single order details
export const detailsOrder = (orderId) => async (dispatch, getState) => {
  try {
    const { authInfo: { authToken } } = getState();
	dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const { data } = await axios.get("/api/orders/" + orderId,
	  {headers: {Authorization: authToken} }
	);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error.response.data });
  }
}


//payment info
export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
  try {
	const { authInfo: { authToken } } = getState();
	dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });
    const { data } = await axios.put("/api/orders/" + order._id + "/pay", 
	  paymentResult,
	  {headers: {Authorization: authToken} }
	);
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_PAY_FAIL, payload: error.message });
  }
}

//delete an order
export const deleteOrder = (orderId) => async (dispatch, getState) => {
  try {
    const { authInfo: { authToken } } = getState();
	dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
    const { data } = await axios.delete("/api/orders/" + orderId, 
	  {headers: {Authorization: authToken} }
	);
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_DELETE_FAIL, payload: error.message });
  }
}