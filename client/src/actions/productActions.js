import axios from "axios";
import { 
  GET_ERRORS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  FILTER_LIST_REQUEST,
  FILTER_LIST_SUCCESS,
  FILTER_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL
} from "./types";


//get list of all products
export const getProductList = (
  category = "",
  searchKeyword = ""
) => async (dispatch) => {
  try{
	dispatch({ type: PRODUCT_LIST_REQUEST });
	const { data } = await axios.get(
	  `/api/products?category=${category}&searchKeyword=${searchKeyword}`
	);
	dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  }
  catch (error){
	dispatch({ type: PRODUCT_LIST_FAIL, payload: error.response.data });
  }
};

//get filtered products list
export const getFilteredProducts = (
  skip, limit, filters=[]
) => async (dispatch) => {
  try{
	dispatch({ type: FILTER_LIST_REQUEST });
	const { data } = await axios.post(`/api/products/search`, {
      skip, limit, filters
    });
	dispatch({ type: FILTER_LIST_SUCCESS, payload: data.data });
  }
  catch (error){
	dispatch({ type: FILTER_LIST_FAIL, payload: error.response.data });
  }
};

//get single product
export const getProductDetails = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } 
  catch (error) {
	dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.response.data });
  }
};

//create product
export const addProduct = (productData, history) => async (dispatch, getState) => {
  try {
	const { authInfo: { authToken } } = getState();
	dispatch({ type: PRODUCT_CREATE_REQUEST, payload: productData });
    const product = await axios.post(`/api/products`, 
	  productData,
	  {headers: {Authorization: authToken} }
	);
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: product, success: true });
	history.push("/products");
  } catch (error) {
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: error.response.data });
  }
};

//update product
export const updateProduct = (productData, productId, history) => async (dispatch, getState) => {
  try {
	const { authInfo: { authToken } } = getState();
	dispatch({ type: PRODUCT_CREATE_REQUEST, payload: productData });
    const data = await axios.put(`/api/products/${productId}`, 
	  productData,
	  {headers: {Authorization: authToken} }
	);
	dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data.data, success: true });
	history.push("/products");
  } catch (error) {
	dispatch({ type: PRODUCT_CREATE_FAIL, payload: error.response.data });
  }
};


//create product
export const editProduct = (productData, history) => async (dispatch, getState) => {
  try {
	const { authInfo: { authToken } } = getState();
	dispatch({ type: PRODUCT_CREATE_REQUEST, payload: productData });
    const product = await axios.post(`/api/products`, 
	  productData,
	  {headers: {Authorization: authToken} }
	);
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: product, success: true });
	history.push("/");
  } catch (error) {
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: error.response.data });
  }
};


//save a review
export const saveReview = (productId, review) => async (dispatch, getState) => {
  try{
	const { authInfo: { authToken } } = getState();
	dispatch({ type: PRODUCT_CREATE_REQUEST, payload: review });
	const { data } = await axios.post(`/api/products/${productId}/review`, 
	  review,
	  {headers: {Authorization: authToken} }
	);
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  }
  catch (error){
	dispatch({ type: PRODUCT_CREATE_FAIL, payload: error.response.data });
  }
};


//delete product
export const deleteProdcut = (productId) => async (dispatch, getState) => {
  try {
    const { authInfo: { authToken } } = getState();
	dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const { data } = await axios.delete(`/api/products/${productId}`, 
	  {headers: {Authorization: authToken} }
	);
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
	dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.response.data });
  }
};



