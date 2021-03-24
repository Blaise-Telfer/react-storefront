import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dimmer, Loader } from "semantic-ui-react";
import { cleanCart } from "../actions/cartActions";
import { detailsOrder, payOrder } from "../actions/orderActions";
import PaypalButton from "../components/PaypalButton";
import ProductDetails from "../components/ProductDetails";


function Payment(props) {
  const dispatch = useDispatch();
  
  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success, error: errorPay } = orderPay;
  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;
  const orderId = props.match.params.id;
  
  useEffect(() => {
	if (success) {
	  dispatch(cleanCart());
      props.history.push(`/confirmation/${orderId}`);
    } else{
	  dispatch(detailsOrder(orderId));
	}
	return () => {
    };
  }, [success]);
  
  const refresh = (e) => {
    e.preventDefault();
	window.location.reload();
  };
  
  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  }
  
  return (
    <div>
	  {loading ? (<Dimmer active inverted size="massive"><Loader inverted>Loading...</Loader></Dimmer>) 
	  : 
	  error ? (<div> {error.message} </div>)
	  : (
	  <div className="payment-container">
		<div className="payment-items">
          {order.orderItems.length === 0 ? (<div> Your Cart Is Empty </div>)
			: (
			  order.orderItems.map((item, i) =>
			  <div className="payment-item" key={i}>
				<Link to={"/product/" + item._id}>
                    <div className="payment-img"> 
					  <img src={item.image} /> 
					</div>
                  </Link>
				<div className="info">
				  <div> {item.name} </div>
				  <div> Qty: {item.qty} </div>
				</div>
			  </div>
			))
		  }
		</div>
		
		<div className="placeorderForm">
		  <div className="paypal">
            {loadingPay && <div>Finalizing Payment...</div>}
            {!order.isPaid ? (
              <PaypalButton
                amount={order.totalPrice}
                onSuccess={handleSuccessPayment} />
			  ) : (null)
            }
			<Link to="" onClick={(e) => refresh(e)} className="loadLink"> 
			  Click here to refresh if the PayPal button hasn't loaded 
			</Link>
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
		
	  </div>
	  )}
    </div>
  );
}
export default Payment;