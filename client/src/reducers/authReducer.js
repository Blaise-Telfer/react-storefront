import { 
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_CURRENT_USER
} from "../actions/types";
const isEmpty = require("is-empty");
const Cookie = require('js-cookie');
const token = localStorage.getItem('jwtToken') || null;
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  authToken: token
};

export const authRegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case REGISTER_SUCCESS:
	  return { loading: false, message: action.payload  };
	case REGISTER_FAIL:
	  return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const authLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
		loading: false
      };
	case LOGIN_FAIL:
	  return { loading: false, error: action.payload };
    default:
      return state;
  }
};

