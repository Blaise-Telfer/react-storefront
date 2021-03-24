import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dimmer, Loader, Button, Container } from "semantic-ui-react";
import { createOrder } from "../actions/orderActions";


function OrderReview(props) {
  const dispatch = useDispatch();
  
  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping } = cart;
  const { address, city, postalCode, country } = shipping;
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  
  const itemsPrice = cartItems.reduce((a, b) => a + b.qty * b.price, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = itemsPrice + shippingPrice;
  const itemsPriceFix = itemsPrice.toFixed(2);
  const shippingPriceFix = shippingPrice.toFixed(2);
  const totalPriceFix = totalPrice.toFixed(2);
  
  
  const orderItems = cartItems.map((x) => {
    return {
      product: x._id,
	  name: x.name,
      qty: x.qty,
      image: x.image,
      price: x.price,
      countInStock: x.countInStock
    };
  });
  
  const orderCreateHandler = (e) => {
	const orderData = {
	  orderItems, shipping, itemsPriceFix, shippingPriceFix, totalPriceFix
	};
	dispatch(createOrder( orderData ));
  }
  
  const refresh = (e) => {
    e.preventDefault();
	window.location.reload();
  };
  
  useEffect(() => {
    if ((!address || !city || !postalCode || !country) || (cartItems.length === 0)){
      props.history.push(`/cart`);
	} else if (success) {
      props.history.push(`/payment/${order._id}`);
    }
  }, [success]);
  
  return (
    <div className="order-review">
	  <h1>Verify Your Information</h1>
	  
	  {loading ? (<Dimmer active inverted size="massive"><Loader inverted>Loading...</Loader></Dimmer>) 
	  : 
	  error ? (<div> {error.message} </div>)
	  : (
		<Container className="orderForm">
		  <div className="trio">
		  
			<div className="items">
			  {cartItems.map((item) => (
				<div key={item._id}> 
				  {item.name} - qty: {item.qty}
				</div>
			  ))}
			</div>
			
			<div className="address">
			  Street Address: {address} 
			  <br/>
			  City: {city}
			  <br/>
              Zip Code: {postalCode}
			  <br/>
			  Country: {country}
			</div>
			
			<div className="price">
			  Subtotal: ${itemsPrice.toFixed(2)}
			  <br/>
			  Shipping: ${shippingPrice.toFixed(2)}
			  <br/>
			  Total: ${totalPrice.toFixed(2)}
			</div>
		  </div>
		  
		  <hr/>
		  <Button primary
		    icon="signup"
		    type="submit"
		    content="Proceed to Payment"
			onClick={orderCreateHandler}
		  />
		  
		  <br/>
		  <Link to="" onClick={(e) => refresh(e)}>
			<p>Click here to reset</p>
		  </Link>
	    </Container>
	    )}
    </div>
  );
}
export default OrderReview;