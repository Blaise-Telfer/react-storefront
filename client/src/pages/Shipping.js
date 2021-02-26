import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveShipping } from "../actions/cartActions";
import ShippingForm from "../components/ShippingForm";
import { Button } from 'semantic-ui-react';


function Checkout(props) {
  const dispatch = useDispatch();
  
  const [values, setValues] = useState({
	address: "",
	city: "",
	postalCode: "",
	country: ""
  });
  const { address, city, postalCode, country } = values;
  
  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping, success } = cart;
  const authInfo = useSelector((state) => state.authInfo);
  const { isAuthenticated } = authInfo;
  
  const itemsPrice = cartItems.reduce((a, b) => a + b.qty * b.price, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = itemsPrice + shippingPrice;
  
  const handleChange = (event) => {
	setValues({ ...values, [event.target.name]: event.target.value });
  };
  
  const submitShippingHandler = (e) => {
    e.preventDefault();
	const shippingData = {
	  address, city, postalCode, country
	}
    dispatch(saveShipping( shippingData ));
  }
  
  useEffect(() => {
    if (cartItems.length === 0) {
      props.history.push(`/cart`);
	} else if (success) {
      props.history.push(`/orderReview`);
    }
  }, [success]);
  
  return (
    <div className="inputForm">
	  <h1>Shipping Info</h1>
	  {isAuthenticated ? (
	    <div>
		  <ShippingForm
		    address={address}
		    city={city}
		    postalCode={postalCode}
		    country={country}
		    handleChange={handleChange}
		    submitHandler={submitShippingHandler}
		  />
	    </div>
	  ) 
	  : (
	    <div>
		  <h3>You must be logged in</h3>
		</div>
	  )}
	  
    </div>
  );
}
export default Checkout;