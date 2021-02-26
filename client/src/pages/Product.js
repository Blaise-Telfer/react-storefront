import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Dimmer, Loader, Button } from "semantic-ui-react";
import { addToCart } from '../actions/cartActions';
import { getProductDetails, saveReview } from "../actions/productActions";
import RatingDisplay from "../components/RatingDisplay";


export const Product = (props) => {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [qty, setQty] = useState(1);
  const productId = props.match.params.id;
  
  const addToCartHandler = () => {
    const numQty = Number(qty);
	dispatch(addToCart(productId, numQty));
  };
  
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  console.log(productDetails);
  
  const productCreate = useSelector((state) => state.productCreate);
  const { error: errorLay, loading: loadingLay, success: reviewSuccess } = productCreate;
  
  const authInfo = useSelector((state) => state.authInfo);
  const { user, isAuthenticated } = authInfo;
  
  useEffect(() => {
    dispatch(getProductDetails(productId));
    
	if(reviewSuccess){
	  window.location.reload();
	}
  }, [productId, reviewSuccess]);
  
  const ReviewHandler = (e) => {
    e.preventDefault();
    dispatch(saveReview(productId, {
        name: user.name,
        rating: rating,
        text: text,
      })
    );
  };
  
  return (
  <div>
	{loading ? ( <Dimmer active inverted size="massive"><Loader inverted>Loading...</Loader></Dimmer> ) 
	: 
	error ? (<div> {error.message} </div>)
	: (
	  <div className="product-container">
		<div className="link-box">
		  <span>
			<Link to="/">Home</Link>
		  </span>
		  <span> &gt;&gt; </span>
		  <span>
			<Link to={`/store/${product.category}`}>{product.category}</Link>
		  </span>
		</div>
		  
		<h1> {product.name} </h1>
		<h1> ${product.price} </h1>
		
		  <div>
			{product.countInStock > 0 ? (
			<div className="cart-add">
			  <div>
				  <select value={qty} onChange={(e) => setQty(e.target.value)}>
					{[...Array(product.countInStock).keys()].map((x) => (
					  <option key={x + 1} value={x + 1}>
						{x + 1}
					  </option>
					))}
				  </select>
				</div>
				<div onClick={addToCartHandler} >
				  <i className="fas fa-cart-plus fa-2x"></i>
			    </div>
			</div>
			) : 
			(<div>Sold Out</div>)}
		  </div>
		  
		<div className="main-img"> 
		  <img src={product.image} /> 
		</div>
		<div className="description-box"> {product.description} </div>
		
		{product.reviews ? (
		  <div>
		    <RatingDisplay
              className="ratingDisplay"
			  value={product.rating}
            />
			{product.reviews.length == 0 ? (<div>There are no reviews yet</div>) 
			: 
			(<div className="reviews-box">
			  {product.reviews.map((review, i) => (
				<div className="single-review" key={i}>
				  {review.text} - <h3>{review.name}</h3>
				  <hr/>
				</div>
			  ))}
			</div>
			)}
		  </div>
		  ) : (<div>There are no reviews yet</div>)
		}
			
			
		{isAuthenticated ? (
		  <div>
			{errorLay ? (<div> {errorLay.message} </div>)
			: (
				  <form onSubmit={ReviewHandler} className="reviewForm">
                      <h3>Leave Your Review</h3>
					  <div>
                        <select
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="1">1- Poor</option>
                          <option value="2">2- Fair</option>
                          <option value="3">3- Good</option>
                          <option value="4">4- Very Good</option>
                          <option value="5">5- Excelent</option>
                        </select>
                      </div>
                      <div>
                        <textarea
                          required
						  name="comment"
						  placeholder="text..."
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                        ></textarea>
                      </div>
                      <div>
                        <Button primary
						  icon="signup"
						  type="submit"
						  content="Post"
						/>
                      </div>
                  </form>
			)}
		  </div>
		) : 
		  <div>Sign in to leave a review</div> 
		}
	  </div>
	)}
  </div>
  );
};
