import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { addProduct, updateProduct, getProductDetails } from "../actions/productActions";
import { getCategoryList } from "../actions/categoryActions";

import { Field, reduxForm, propTypes } from "redux-form";
import { Button, Header, Form, Segment, Input, Container, Dimmer, Loader, Message } from 'semantic-ui-react';
import TextInput from "./TextInput";
import SelectListField from "../components/SelectListField";


class CreateEditProduct extends Component{
  constructor(props) {
	super(props)
	this.onSubmit = this.onSubmit.bind(this)
	this.state = { 
	  image: "", 
	  category: "",
	  redirect: false 
	}
  }

  componentDidMount() {
	const { id } = this.props.match.params;
	if (id) {
	  this.props.getProductDetails(id);
	}
	this.props.getCategoryList();
  }

  onSubmit(product) {
	let productData = new FormData();
	productData.append("image", this.state.image);
	productData.append("categoryId", this.state.category);
	productData.append("name", product.name);
	productData.append("description", product.description);
	productData.append("price", product.price);
	productData.append("countInStock", product.countInStock);
	productData.append("brand", product.brand);
	
	const testId = product._id;
	if (!product._id) {
	  this.props.addProduct(productData, this.props.history)
	} else {
	  this.props.updateProduct(productData, testId, this.props.history)
	}
  }

  componentWillReceiveProps = (nextProps) => { // Receive Mall data Asynchronously
	const { productDetails } = nextProps;
	if(productDetails._id !== this.props.productDetails._id) { // Initialize form only once
	  this.props.initialize(productDetails)
	}
  }

  onChange = (e) => {
	this.setState({ [e.target.name]: e.target.value })
  };

  onChangeImage = (e) => {
	this.setState({ image: e.target.files[0] });
  };

  render() {
	const { productDetails, productCreate } = this.props;
	const { loading, error } = this.props.productCreate;
	const { categories } = this.props.categoryList;
	
	let options = [];
	options = [{ label: "Select Category", value: 0 }, ...categories.map(category => {
	  return {
		label: category.name,
		value: category._id
	  }
    })];
	
	return (
	  <div className="inputForm">
		  <Container text>
			<Header as="h1" content={this.props.match.params.id ? "Edit Product" : "Add New Product" } />
			  <form  onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form submitForm">
				{loading ? (<Dimmer active inverted size="massive"><Loader inverted>Loading...</Loader></Dimmer>) 
			    : 
			    error ? <Message className="error-text" content={error.message} /> 
			    : null}
				<Segment>
				
				  <Field name="name" type="text" component={TextInput} label="Name" required />
				  <Field name="description" type="text" component={TextInput} label="Description" required />
				  <Field name="price" type="number" component={TextInput} label="Price" required />
				  <Field name="countInStock" type="number" component={TextInput} label="# In Stock" required />
				  <Field name="brand" type="text" component={TextInput} label="Brand" required />
				  
				  <SelectListField
					placeholder="category..."
					name="category"
					options={options}
					onChange={this.onChange}
				  />
				  <Input name="image" type="file" onChange={this.onChangeImage} />
				  
				  <Button primary type="submit" disabled={this.props.pristine} content="Submit" />
				  <Button as="a" href="/products" content="Cancel" />
			      </Segment>
			  </form>
			
			<div className="payment-img"> <img src={productDetails.image} alt="[product image]"/> </div>
		  </Container>
	  </div>    
	)
  }
}




CreateEditProduct.propTypes = {
  ...propTypes
}

const validate = values => {
  const errors = {}
  if (!values.name) errors.name = 'Required'
  if (!values.address) errors.address = 'Required'
  return errors
}

const mapStateToProps = (state) => ({
  categoryList: state.categoryList,
  productCreate: state.productCreate,
  productDetails: state.productDetails.product
});

let CreateEditProductView = reduxForm({
  validate,
  form: 'CreateEditProduct',
  destroyOnUnmount: false
})(CreateEditProduct);

export default connect(mapStateToProps, {addProduct, updateProduct, getProductDetails, getCategoryList})(CreateEditProductView);