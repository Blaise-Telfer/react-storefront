import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";
import Cookie from 'js-cookie';

import {
  authRegisterReducer,
  authLoginReducer,
  cartReducer,
  categoryListReducer,
  categoryCreateReducer,
  categoryDeleteReducer,
  productListReducer,
  filterListReducer,
  productDetailsReducer,
  productCreateReducer,
  productDeleteReducer,
  orderCreateReducer, 
  orderDetailsReducer, 
  myOrderListReducer, 
  orderListReducer, 
  orderPayReducer, 
  orderDeleteReducer
} from "./reducers";

// Fetch cartItems from localStorage, if exists run through parse and save in const
const cartItems = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];


const userInfo = Cookie.getJSON('userCookie') || null;
const initialState = {
  cart: { cartItems, shipping: {} }
};

const reducer = combineReducers({
  authRegister: authRegisterReducer,
  authInfo: authLoginReducer,
  cart: cartReducer,
  categoryList: categoryListReducer,
  categoryCreate: categoryCreateReducer,
  categoryDelete: categoryDeleteReducer,
  productList: productListReducer,
  filterList: filterListReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  productDelete: productDeleteReducer,
  orderCreate: orderCreateReducer, 
  orderDetails: orderDetailsReducer, 
  myOrderList: myOrderListReducer, 
  orderList: orderListReducer, 
  orderPay: orderPayReducer, 
  orderDelete: orderDeleteReducer,
  form: formReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const Store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
