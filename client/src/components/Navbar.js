import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/userActions";
import Logo from "./logo.png";


class Navbar extends Component{

  state= {
	totalQuantity: null
  }
  
  componentDidMount() {
	const items = this.props.cart.cartItems;
	this.setState({ totalQuantity: items.length || null });
	if (items) {
	  const cartNum = items.reduce(
	    (a, b) => parseInt(a) + parseInt(b.qty), 0
	  );
	  this.setState({ totalQuantity: cartNum || null });
	}
  }
  
  componentDidUpdate(prevProps) {
	const newItems = this.props.cart.cartItems;
	const oldItems = prevProps.cart.cartItems
	if (newItems !== oldItems) {
	  const cartNum = newItems.reduce(
	    (a, b) => parseInt(a) + parseInt(b.qty), 0
	  );
	  this.setState({ totalQuantity: cartNum || null });
	}
  }
  
  onLogoutClick = (e) => {
	e.preventDefault();
	this.props.logoutUser();
  };
  
  render() {
	const { totalQuantity } = this.state;
	const { onLogoutClick, authInfo } = this.props;
	
	return (
	  <nav className="mb-4 navbar navbar-expand-md navbar-dark bg-unique">
	    <div className="logo-cart">
		  <div className="logo"> 
			<Link to="/"> <img src={Logo} alt="logo" /> </Link>
		  </div>
		  <Link to="/cart" className="cart-icon"> 
			<i className="fas fa-shopping-cart fa-2x"></i> 
			<span className="cart-num"> {totalQuantity} </span>
		  </Link>
		</div>
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-3">
		  <span className="navbar-toggler-icon"></span>
		</button>
		
		{!authInfo.isAuthenticated ? (
		  <div className="collapse navbar-collapse" id="navbarSupportedContent-3">
			<ul className="navbar-nav ml-auto nav-flex-icons">
			  <li className="nav-item">
			    <a className="nav-link" href="/">Home</a>
			  </li>
			  <li className="nav-item">
			    <a className="nav-link" href="/store">Search</a>
			  </li>
			  <li className="nav-item">
			    <a className="nav-link" href="/login">Login</a>
			  </li>
			  <li className="nav-item">
			    <a className="nav-link" href="/register">Register</a>
			  </li>
			</ul>
		  </div>
		)
		:
		authInfo.isAuthenticated && authInfo.user.role == "admin" ? (
		  <div className="collapse navbar-collapse" id="navbarSupportedContent-3">
			<ul className="navbar-nav ml-auto nav-flex-icons">
			  <li className="nav-item">
			    <a className="nav-link" href="/">Home</a>
			  </li>
			  <li className="nav-item">
			    <a className="nav-link" href="/store">Search</a>
			  </li>
			  <li className="nav-item">
			    <a className="nav-link" href="/products">Products Page</a>
			  </li>
			  <li className="nav-item">
			    <a className="nav-link" href="/orders">Orders Page</a>
			  </li>
			  <li className="nav-item">
			    <a className="nav-link" onClick={this.onLogoutClick}>Logout</a>
			  </li>
			</ul>
		  </div>
		) 
		:
		authInfo.isAuthenticated ? (
		  <div className="collapse navbar-collapse" id="navbarSupportedContent-3">
			<ul className="navbar-nav ml-auto nav-flex-icons">
			  <li className="nav-item">
			    <a className="nav-link" href="/">Home</a>
			  </li>
			  <li className="nav-item">
			    <a className="nav-link" href="/store">Search</a>
			  </li>
			  <li className="nav-item">
			    <a className="nav-link" onClick={this.onLogoutClick}>Logout</a>
			  </li>
			</ul>
		  </div>
		)
		:
		( null )}
		
	  </nav>
	);
  }
};


Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  authInfo: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authInfo: state.authInfo,
  cart: state.cart
});


export default connect(mapStateToProps, {logoutUser})(Navbar);