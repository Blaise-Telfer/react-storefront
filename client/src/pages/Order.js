import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cleanCart } from "../actions/cartActions";
import { detailsOrder, payOrder } from "../actions/orderActions";
import PaypalButton from "../components/PaypalButton";
import { Dimmer, Loader } from 'semantic-ui-react';


function Checkout(props) {
  const dispatch = useDispatch();
  
  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success, error: errorPay } = orderPay;
  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;
  console.log(orderDetails);
  
  useEffect(() => {
    if (success) {
	  dispatch(cleanCart());
      props.history.push("/orders");
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }
    return () => {
    };
  }, [success]);
  
  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  }
  
  return (
    <div className="form">
	  {loading ? (<Dimmer active inverted size="massive"><Loader inverted>Loading...</Loader></Dimmer>) 
	  : 
	  error ? (<div> {error.message} </div>)
	  : (
	  <div className="cart-container">
	    <div className="cart-items">
		  <div>
            <h3> Shipping </h3>
            
			{order.orderItems.length === 0 ?
              <div> Cart is empty </div>
              :
              order.shipping.map(item =>
			  <li key={item._id}>
				<p>{item.address}</p>
				<p>{item.city}</p>
				<p>{item.postalCode}</p>
				<p>{item.country}</p>
              </li>
              )
            }
			
            <div>
              {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered."}
            </div>
          </div>
		  
		  <div>
            {order.isPaid ? "Paid at " + order.paidAt : "Not Paid."}
          </div>
		  
		  <div>
            <ul className="cart-list-container">
              <li>
                <h3> Shopping Cart </h3>
                <div> Price </div>
              </li>
              {
                order.orderItems.length === 0 ?
                  <div> Cart is empty </div>
                  :
                  order.orderItems.map(item =>
					<li key={item._id}>
                        <div className="cart-img">
                            <img src={item.image} alt="product" />
                          </div>
                        <div className="cart-name">
                          <Link to={"/product/" + item.product}>
                            {item.name}
                          </Link>
                          <div> Qty: {item.qty} </div>
                        </div>
                        <div> ${item.price} </div>
					</li>
                  )
              }
            </ul>
          </div>
		</div>
		
		<div className="placeorder-action">
          <ul>
            
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${order.itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${order.shippingPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>${order.totalPrice}</div>
            </li>
          </ul>

        </div>
	  </div>
	  )}
    </div>
  );
}
export default Checkout;