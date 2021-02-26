import axios from "axios";
import { 
  GET_ERRORS,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL
} from "./types";


//create a cateogry
export const addCategory = (categoryData, history) => async (dispatch, getState) => {
  try{
	const { authInfo: { authToken } } = getState();
	dispatch({ type: CATEGORY_CREATE_REQUEST, payload: categoryData });
	const category = await axios.post(`/api/category/createCategory`, 
	  categoryData,
	  {headers: {Authorization: authToken} }
	);
	dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: category });
	history.push("/products");
  }
  catch (error){
	dispatch({ type: CATEGORY_CREATE_FAIL, payload: error.response.data });
  }
};

//get a list of cateogries
export const getCategoryList = () => async (dispatch, getState) => {
  try {
    const { authInfo: { authToken } } = getState();
	dispatch({ type: CATEGORY_LIST_REQUEST });
    const categories = await axios.get(`/api/category/`,
	  {headers: {Authorization: authToken} }
	);
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: categories.data });
  } catch (error) {
	dispatch({ type: CATEGORY_LIST_FAIL, payload: error.response.data });
  }
};

//delete category
export const deleteCategory = (categoryId) => async (dispatch, getState) => {
  try {
    const { authInfo: { authToken } } = getState();
	dispatch({ type: CATEGORY_DELETE_REQUEST, payload: categoryId });
    const { data } = await axios.delete(`/api/category/${categoryId}`, 
	  {headers: {Authorization: authToken} }
	);
    dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
	dispatch({ type: CATEGORY_DELETE_FAIL, payload: error.response.data });
  }
};


