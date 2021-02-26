import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";
import { getProductList, deleteProdcut } from "../actions/productActions";
import { getCategoryList, deleteCategory } from "../actions/categoryActions";


function ProductsScreen(props) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, products, error } = productList;
  const { categories } = categoryList;
  
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  
  const categoryDelete = useSelector((state) => state.categoryDelete);
  const {
    loading: loadingCatDelete,
    success: successCatDelete,
    error: errorCatDelete,
  } = categoryDelete;
  
  useEffect(() => {
    dispatch(getProductList());
	dispatch(getCategoryList());
    return () => {};
  }, [successDelete, successCatDelete]);
  
  const deleteHandler = (product) => {
    dispatch(deleteProdcut(product._id));
  };
  const deleteCategoryHandler = (category) => {
    dispatch(deleteCategory(category._id));
  };
  
  return (
    <div className="">
	  {loading ? (<Dimmer active inverted size="massive"><Loader inverted>Loading...</Loader></Dimmer>) 
	  : 
	  error ? (<div> {error.message} </div>) 
	  : (
	  <div className="products-layout">
		<div className="products-header">
			<h1>Products</h1>
			<Link to="/addProduct"><button> Add Product </button></Link>
			<Link to="/addCategory"><button> Add Category </button></Link>
		</div>
		<div className="products-list">
			<table className="table">
			  <thead>
				<tr>
				  <th>ID</th>
				  <th>Name</th>
				  <th>Price</th>
				  <th>Category</th>
				  <th>Brand</th>
				  <th>Action</th>
				</tr>
			  </thead>
			  <tbody>
				{products.map((product) => (
				  <tr key={product._id}>
					<td>{product._id}</td>
					<td>{product.name}</td>
					<td>{product.price}</td>
					<td>{product.category}</td>
					<td>{product.brand}</td>
					<td>
					  <Link to={`/editProduct/${product._id}`}>
					    Edit Product
					  </Link>
					  <button
						className="button"
						onClick={() => deleteHandler(product)}
					  >
						Delete
					  </button>
					</td>
				  </tr>
				))}
			  </tbody>
			</table>
			
			<table className="table">
			  <thead>
				<tr>
				  <th>ID</th>
				  <th>Name</th>
				</tr>
			  </thead>
			  <tbody>
				{categories.map((category) => (
				  <tr key={category._id}>
					<td>{category._id}</td>
					<td>{category.name}</td>
					<td>
					  <button
						className="button"
						onClick={() => deleteCategoryHandler(category)}
					  >
						Delete Category
					  </button>
					</td>
				  </tr>
				))}
			  </tbody>
			</table>
			
			
		</div>
	  </div>
	  )}
	</div>
  );
}
export default ProductsScreen;
