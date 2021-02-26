import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
  Button,
  Container,
  Form,
  Dropdown,
  Message,
  Segment,
} from 'semantic-ui-react';
import axios from "axios";


const ProductForm = ({ name, price, brand, countInStock, description, onChange, onSubmit }) => 
(
	<Container text>
		<Form onSubmit={onSubmit}>
		<Segment>
		
		<Form.Input
		  fluid
		  required
		  label="name"
		  placeholder="name"
		  name="name"
		  type="text"
		  value={name}
		  onChange={onChange}
		/>
		<Form.Input
		  fluid
		  required
		  label="price"
		  placeholder="price"
		  name="price"
		  type="number"
		  value={price}
		  onChange={onChange}
		/>
		<Form.Input
		  fluid
		  required
		  label="countInStock"
		  placeholder="countInStock"
		  name="countInStock"
		  type="number"
		  value={countInStock}
		  onChange={onChange}
		/>
		<Form.Input
		  fluid
		  required
		  label="brand"
		  placeholder="brand"
		  name="brand"
		  type="text"
		  value={brand}
		  onChange={onChange}
		/>
		<Form.Input
		  fluid
		  required
		  label="description"
		  placeholder="description"
		  name="description"
		  type="text"
		  value={description}
		  onChange={onChange}
		/>
		
		<Button
		  icon="signup"
		  type="submit"
		  color="black"
		  content="Update"
		/>
		
		</Segment>
		</Form>
	</Container> 
);


export default ProductForm;