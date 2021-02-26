import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { addProduct } from "../actions/productActions";
import { getCategoryList } from "../actions/categoryActions";
import SelectListField from "../components/SelectListField";
import {
  Button,
  Container,
  Form,
  Dropdown,
  Message,
  Segment, Dimmer, Loader
} from 'semantic-ui-react';


class AddProduct extends Component{
  constructor() {
	super();
	  this.state = {
		product: {
		  name: "",
		  price: "",
		  brand: "",
		  countInStock: "",
		  description: ""
		},
		image: "",
		uploading: false
	  };
	}
	
	async componentDidMount() {
	  await this.props.getCategoryList();
	}
	
	onChange = (e) => this.setState({
      product: {...this.state.product, [e.target.name]: e.target.value }
    });
	
	onChangeImage = e => {
	  this.setState({ image: e.target.files[0] });
	};
	
	onSubmit = (e) => {
	  e.preventDefault();
	  const { product } = this.state;
	  let productData = new FormData();
	  productData.append("image", this.state.image);
	  productData.append("name", product.name);
	  productData.append("price", product.price);
	  productData.append("brand", product.brand);
	  productData.append("countInStock", product.countInStock);
	  productData.append("description", product.description);
	  productData.append("categoryId", product.category);
	  
	  this.props.addProduct(productData, this.props.history);
	};
	
	render(){
		const { product, uploading } = this.state;
		const { categories } = this.props.categoryList;
		const { loading, error } = this.props.productCreate;
		
		let options = [];
        options = [{ label: '* Select Category', value: 0 }, ...categories.map(category => {
          return {
            label: category.name,
            value: category._id
          }
        })]
        
		return(
			<div className="inputForm">
				<h1>New Product</h1>
				
				{loading ? (<Dimmer active inverted size="massive"><Loader inverted>Loading...</Loader></Dimmer>) 
				: error ? <Message content={error.message} /> : null}
				<Container text>
					<Form onSubmit={this.onSubmit} className="submitForm">
					  <Segment>
						<Form.Input
						  fluid
						  required
						  icon="envelope"
						  iconPosition="left"
						  label="Name"
						  placeholder="name..."
						  name="name"
						  type="text"
						  value={product.name}
						  onChange={this.onChange}
						/>
						<SelectListField
						  placeholder="category..."
                          name="category"
                          value={product.category}
                          onChange={this.onChange}
                          options={options}
                        />
						<Form.Input
						  fluid
						  required
						  icon="envelope"
						  iconPosition="left"
						  label="Price"
						  placeholder="price..."
						  name="price"
						  type="number"
						  value={product.price}
						  onChange={this.onChange}
						/>
						<Form.Input
						  fluid
						  required
						  icon="envelope"
						  iconPosition="left"
						  label="Current Count In Stock"
						  placeholder="count in stock..."
						  name="countInStock"
						  type="number"
						  value={product.countInStock}
						  onChange={this.onChange}
						/>
						
						
						<input
						  type="file"
						  className="form-input"
						  onChange={this.onChangeImage}
						/>
						
						
						<Form.Input
						  fluid
						  required
						  icon="envelope"
						  iconPosition="left"
						  label="Brand"
						  placeholder="brand..."
						  name="brand"
						  type="text"
						  value={product.brand}
						  onChange={this.onChange}
						/>
						<Form.Input
						  fluid
						  required
						  icon="envelope"
						  iconPosition="left"
						  label="Description"
						  placeholder="description..."
						  name="description"
						  type="text"
						  value={product.description}
						  onChange={this.onChange}
						/>
						
						<Button primary
						  icon="signup"
						  type="submit"
						  content="Create Product"
						  disabled={!this.state.image || !product.category}
						/>
					  </Segment>
					</Form>
				</Container>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	categoryList: state.categoryList,
	productCreate: state.productCreate
});

export default connect(mapStateToProps, {addProduct, getCategoryList})(AddProduct);