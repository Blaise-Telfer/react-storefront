import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { addToCart, cartNumChange, removeFromCart } from "../actions/cartActions";


export const Cart = (props) => {
  
  const dispatch = useDispatch();
  const { cartItems, error } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.authInfo);
  
  const itemsPrice = cartItems.reduce((a, b) => a + b.qty * b.price, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = itemsPrice + shippingPrice;

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    props.history.push(`/shipping`);
  };

  return (
    <div>
        {cartItems.length === 0 ? (
          <div className="emptyNotice">
            <div>Your shopping cart is empty.</div>
            <Link to="/">
              Go shopping
            </Link>
          </div>
		)
		:
		error ? ({ error })
		: (
        <div className="cart-container">
			<div className="cart-items">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">
                
				  <Link to={"/product/" + item._id}>
                    <div className="cart-img"> 
					  <img src={item.image} /> 
					</div>
                  </Link>
				  
                  <div className="info">
                    <div >{item.name} - ${item.price}</div>
					<select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(cartNumChange(item._id, e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
					<div onClick={() => removeHandler(item._id)} >
					  <i className="far fa-trash-alt"></i>
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
          
          <div className="price-box">
            <div className="subtotal-text">Subtotal</div>
            <div className="subtotal-num">$ {itemsPrice.toFixed(2)}</div>
            <div className="shipping-text">Shipping</div>
            <div className="shipping-num">${shippingPrice.toFixed(2)}</div>
            <div className="total-text">Total</div>
            <div className="total-num">$ {totalPrice.toFixed(2)}</div>
			
			{isAuthenticated ? (
			  <Button primary
				icon="signup"
				type="submit"
				onClick={checkoutHandler} 
			    disabled={cartItems.length === 0}
				content="Proceed To Checkout"
			  />
			) : (
			  <div>
			    <Link to="/login"> Login to proceed to checkout </Link>
				<br/>
			    <Link to="/register"> Or create an account </Link>
			  </div>
			)}
          </div>
		  
        </div>
        )}
      </div>
  );
};
