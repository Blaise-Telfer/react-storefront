import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dimmer, Loader, Button } from "semantic-ui-react";
import { getProductList } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
import { getCategoryList } from "../actions/categoryActions";
import ProductDetails from "../components/ProductDetails";
import Pagination from "react-js-pagination";


export const StorePage = (props) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [activePage, setActivePage] = useState(1);
  
  const productList = useSelector((state) => state.productList);
  const categoryList = useSelector((state) => state.categoryList);
  const { products, loading, error } = productList;
  const { categories, error: catError } = categoryList;
  
  const category = props.match.params.category
    ? props.match.params.category
    : "";
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductList(category));
  }, [dispatch, category]);
  
  const dispatchCategories = useDispatch();
  useEffect(() => {
    dispatchCategories(getCategoryList());
  }, [dispatchCategories]);
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getProductList(category, searchKeyword, sortOrder));
  };
  
  const addToCartHandler = (event, id) => {
	event.preventDefault();
	dispatch(addToCart(id, 1));
  };
  
  const handlePageChange = (pageNumber) => {
	setActivePage(pageNumber);
  }
  const totalItems = products.length;
  let activeProducts = products.slice (itemsPerPage * activePage - itemsPerPage, itemsPerPage * activePage)
  
  return (
    <div className="filter-page">
	  <div className="sidebar">
		<a href="/">Home</a>
		<a href="/store">Search</a>
		<a href="/cart">Your Cart</a>
	  </div>
		
	  <div className="search-results">
		<div className="search-header">
			<form onSubmit={submitHandler}>
			  <input
				name="searchKeyword"
				onChange={(e) => setSearchKeyword(e.target.value)}
			  />
			  <Button primary
				icon="signup"
				type="submit"
				content="Search"
			  />
			</form>
			
			{catError
			  ? null
			  : <div>Couldn't Load Categories; Try Refreshing</div>
			  ? <div className="category-box">
			    {categories.map((cat) => (
				  <h2 key={cat._id}>
				    <NavLink to={"/store/" + cat.name}>{cat.name}</NavLink>
				  </h2>
			    ))}
				</div>
			  : null
			}
		</div>
		
		{loading ? (<Dimmer active inverted size="massive"><Loader inverted>Loading...</Loader></Dimmer>)
		: 
		error ? (<div> {error.message} </div>)
		: (
		  <div>
			  <div className="products">
				{activeProducts.map((product) => (
				  <li key={product._id}>
					<ProductDetails
					  product={product}
					  addToCart={event => {addToCartHandler(event, product._id)}}
					/>
				  </li>
				))}
			  </div>
			
			<Pagination
			  activePage={activePage}
			  itemsCountPerPage={itemsPerPage}
			  totalItemsCount={totalItems}
			  pageRangeDisplayed={5}
			  onChange={handlePageChange}
			/>
		  </div>
		)}
      </div>
    </div>
  );
};
