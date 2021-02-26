import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { logoutUser } from "../../actions/userActions";
import { RightNav, Burger } from "./navStyle";
import Logo from "./logo.png";
import styled from "styled-components";

const Nav = styled.nav`
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  .nav-cart {
    padding: 15px 0;
	display: flex;
	align-items: center;
	
  }
`

class Navbar extends Component{
	
	constructor(props){
      super(props)
      this.state= {
		totalQuantity: null
      }
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
	  const { authInfo } = this.props;
	  
	  return (
		<Nav className="Navbar">
		  <div className="logo-cart">
			<div className="logo"> 
			  <Link to="/"> <img src={Logo} alt="logo" /> </Link>
			</div>
			<Link to="/cart"> 
			  <i className="fas fa-shopping-cart fa-2x"></i> 
			  <span className="cart-num"> {totalQuantity} </span>
			</Link>
		  </div>
		  <Burger 
		    onLogoutClick={(e) => this.onLogoutClick(e)}
			authInfo={this.props.authInfo}
		  />
        </Nav>
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
  
  
  
  