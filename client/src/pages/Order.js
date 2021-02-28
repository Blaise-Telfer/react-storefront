import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cleanCart } from "../actions/cartActions";
import { detailsOrder, payOrder } from "../actions/orderActions";
import PaypalButton from "../components/PaypalButton";
import { Dimmer, Loader } from 'semantic-ui-react';
import moment from "moment";


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
          </div>
		  
		  <div>
            {order.isPaid ? "Paid at " + moment(order.paidAt).format("YYYY/MM/DD HH:mm:ss") : "Not Paid."}
          </div>
		  
		  <div>
            <ul className="cart-list-container">
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
		
		<div className="summary">
			{order.orderItems.length === 0 ? (<div> Your Cart Is Empty </div>)
			  : (
				order.shipping.map((item, i) =>
				<div key={i}>
				  <p>{item.address}</p>
				  <p>{item.city}</p>
				  <p>{item.postalCode}</p>
				  <p>{item.country}</p>
				</div>
			  ))
			}
			<div>
              <p>Items - ${order.itemsPrice}</p>
              <p>Shipping - ${order.shippingPrice}</p>
              <p>Order Total - ${order.totalPrice}</p>
			</div>
		</div>
		
	  </div>
	  )}
    </div>
  );
}
export default Checkout;