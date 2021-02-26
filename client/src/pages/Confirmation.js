import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsOrder } from "../actions/orderActions";
import { Dimmer, Loader, Container } from 'semantic-ui-react';


function Confirmation(props) {
  const dispatch = useDispatch();
  
  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;
  const orderId = props.match.params.id;
  
  useEffect(() => {
    dispatch(detailsOrder(orderId));
	return () => {};
  }, [dispatch, orderId]);
  
  return (
    <div className="confirmPage">
	  {loading ? (<Dimmer active inverted size="massive"><Loader inverted>Loading...</Loader></Dimmer>) 
	  : 
	  error ? (<div> {error.message} </div>)
	  : (
		<Container className="confirmForm">
		  Thank you for your business.
		  <hr/>
		  Your order is on its way, and an email confirmation has been sent to you account
		  <hr/>
		  Your order # is {order._id}
	    </Container>
	    )}
    </div>
  );
};

export default Confirmation