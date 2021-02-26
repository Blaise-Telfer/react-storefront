import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { editProduct, getProductDetails } from "../actions/productActions";
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


class EditProduct extends Component{
  constructor() {
	super();
	this.state = {
		productToEdit: {
		  name: "",
		  price: "",
		  brand: "",
		  countInStock: "",
		  description: ""
		},
		image: ""
	};
  }
	
	async componentDidMount(props) {
	  const productId = this.props.match.params.id;
	  const { product } = this.props.productDetails;
	  
	  await this.props.getCategoryList();
      await this.props.getProductDetails(productId);
	  this.setState({ productToEdit: product });
	}
	
	onChange = (e) => this.setState({
      productToEdit: {...this.state.productToEdit, [e.target.name]: e.target.value }
    });
	
	onChangeImage = e => {
	  this.setState({ image: e.target.files[0] });
	};
	
	onSubmit = (e) => {
	  e.preventDefault();
	  const { productToEdit } = this.state;
	  const { product } = this.props.productDetails;
	  let updateData = new FormData();
	  updateData.append("image", this.state.image);
	  updateData.append("name", productToEdit.name);
	  updateData.append("price", productToEdit.price);
	  updateData.append("brand", productToEdit.brand);
	  updateData.append("countInStock", productToEdit.countInStock);
	  updateData.append("description", productToEdit.description);
	  updateData.append("categoryId", productToEdit.category);
	  
	  this.props.editProduct(updateData, product, this.props.history);
	};
	
	render(){
		const { productToEdit } = this.state;
		const { categories } = this.props.categoryList;
		const { product, loading, error } = this.props.productDetails;
		console.log(productToEdit);
		
		let options = [];
        options = [{ label: '* Select Category', value: 0 }, ...categories.map(category => {
          return {
            label: category.name,
            value: category._id
          }
        })]
        
		return(
			<div className="inputForm">
				<h1>Edit Product</h1>
				
				{loading ? (<Dimmer active inverted size="massive"><Loader inverted>Loading...</Loader></Dimmer>) 
				: error ? <Message content={error.message} /> : (
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
						  value={productToEdit.name || ""}
						  onChange={this.onChange}
						/>

						<SelectListField
						  placeholder="category..."
                          name="category"
                          value={productToEdit.category || ""}
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
						  value={productToEdit.price || ""}
						  onChange={this.onChange}
						/>
						<Form.Input
						  fluid
						  required
						  icon="envelope"
						  iconPosition="left"
						  label="Count In Stock"
						  placeholder="count in stock..."
						  name="countInStock"
						  type="number"
						  value={productToEdit.countInStock}
						  onChange={this.onChange}
						/>
						
						<input
						  type="file"
						  className="form-input"
						  onChange={this.onChangeImage}
						/>
						<div className="imgPreview">
						  <img src={product.image} />
						</div>
						
						<Form.Input
						  fluid
						  required
						  icon="envelope"
						  iconPosition="left"
						  label="Brand"
						  placeholder="brand..."
						  name="brand"
						  type="text"
						  value={productToEdit.brand}
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
						  value={productToEdit.description}
						  onChange={this.onChange}
						/>
						
						<Button primary
						  icon="signup"
						  type="submit"
						  content="Update Product"
						/>
					  </Segment>
					</Form>
				  </Container>
				)}
				
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	categoryList: state.categoryList,
	productDetails: state.productDetails
});

export default connect(mapStateToProps, {editProduct, getProductDetails, getCategoryList})(EditProduct);