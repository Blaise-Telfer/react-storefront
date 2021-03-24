import React, { Component } from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import jwt_decode from "jwt-decode";

// Pages
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import { StorePage } from "./pages/Shop";
import AddCategory from "./pages/AddCategory";
import Filter from "./pages/Home";

import OrdersPage from "./pages/OrdersPage";
import Order from "./pages/Order";
import ProductsPage from "./pages/ProductsPage";
import { Product } from "./pages/Product";
import { Cart } from "./pages/Cart";
import Shipping from "./pages/Shipping";
import OrderReview from "./pages/OrderReview";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import CreateEditProduct from "./pages/CreateEditProduct";

import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/privateRoute";
import AdminRoute from "./components/adminRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { setCurrentUser, logoutUser } from "./actions/userActions";
import setAuthToken from "./actions/token";
import { Store } from "./store";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  Store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    Store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

export const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Router history={history}>
          <Navbar />
		  <div className="grid-container">
            
			<div className="main-content">
			<Switch>
              <Route exact path="/" component={Filter} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
			  
			  <AdminRoute exact path="/addProduct" component={CreateEditProduct} />
			  <AdminRoute exact path="/editProduct/:id" component={CreateEditProduct} />
			  <AdminRoute exact path="/addCategory" component={AddCategory} />
			  
			  <AdminRoute exact path="/orders" component={OrdersPage} />
			  <AdminRoute exact path="/order/:id" component={Order} />
			  <AdminRoute exact path="/products" component={ProductsPage} />
			  <Route exact path="/product/:id" component={Product} />
              <Route exact path="/store" component={StorePage} />
			  <Route exact path="/store/:category" component={StorePage} />
              
              <Route exact path="/cart" component={Cart} />
			  <PrivateRoute exact path="/shipping" component={Shipping} />
			  <PrivateRoute exact path="/orderReview" component={OrderReview} />
			  <PrivateRoute exact path="/payment/:id" component={Payment} />
			  <PrivateRoute exact path="/confirmation/:id" component={Confirmation} />
			  
              <Route exact path="*" component={NotFound} />
			</Switch>
			</div>
			<Footer />
			
		  </div>
        </Router>
      </Provider>
    );
  }
}


export default App;