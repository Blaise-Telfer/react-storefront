import axios from "axios";
import jwt_decode from "jwt-decode";
import cookie from 'js-cookie';
import setAuthToken from "./token";
import { 
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUEST,
  LOGIN_FAIL,
  SET_CURRENT_USER,
} from "./types";


//register function
export const registerUser = (userData, history) => async (dispatch) => {
  try{
    dispatch({ type: REGISTER_REQUEST });
    const { data } = await axios.post(`/api/auth/register`, userData);
    dispatch({ type: REGISTER_SUCCESS, payload: data });
	history.push(`/login`);
  }
  catch(error){
    dispatch({ type: REGISTER_FAIL, payload: error.response.data });
  }
};


//login function
export const loginUser = (userData, history) => async (dispatch) => {
  try{
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await axios.post(`/api/auth/login`, userData);
    const token = data.token;
	const decoded = jwt_decode(token);
    dispatch({ type: SET_CURRENT_USER, payload: decoded });
    cookie.set("userCookie", token);
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
	history.push(`/`);
	window.location.reload();
  }
  catch(error){
    dispatch({ type: LOGIN_FAIL, payload: error.response.data });
  }
};

//exported to store.js and App.js
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};


//logout function
export const logoutUser = () => (dispatch) => {
  cookie.remove("userCookie");
  localStorage.removeItem("jwtToken");
  //remove auth header for future requests
  setAuthToken(false);
  dispatch({ type: SET_CURRENT_USER, payload: {} });
};

