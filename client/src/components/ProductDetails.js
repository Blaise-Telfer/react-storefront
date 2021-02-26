import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import { Card } from "semantic-ui-react";
import RatingDisplay from "./RatingDisplay";


const ProductDetails = ({ product, addToCart }) => {
    
    return (
      <Card className="product-card">
		<Link to={"/product/" + product._id}>
		  <h2>{product.name}</h2>
		  <div className="product-img"> 
			<img src={product.image} /> 
		  </div>
		</Link>
		
		{!product.reviews.length ? (
		  <RatingDisplay
            value={0}
          />
		) : (
		  <RatingDisplay
            value={product.rating}
          />
		)}
		
		<div className="cart-price">
		  <h2>${product.price}</h2>
		  <span> &nbsp; &nbsp; &nbsp; </span>
		  
		  {product.countInStock > 0 ? (
			<div onClick={addToCart} >
			  <i className="fas fa-cart-plus fa-2x"></i>
			</div>
		  ) : 
		  (<div>Sold Out</div>)}
		  
		</div>
      </Card>
    );
};
  
  export default ProductDetails;