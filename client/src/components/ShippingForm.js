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


const ShippingForm = ({ address, city, postalCode, country, handleChange, submitHandler }) => 
(
	<Container text>
		<Form onSubmit={submitHandler} className="submitForm">
		<Segment>
		
		<Form.Input
		  fluid
		  required
		  label="Street Address"
		  placeholder="address..."
		  name="address"
		  type="text"
		  value={address}
		  onChange={handleChange}
		/>
		<Form.Input
		  fluid
		  required
		  label="City"
		  placeholder="city..."
		  name="city"
		  type="text"
		  value={city}
		  onChange={handleChange}
		/>
		<Form.Input
		  fluid
		  required
		  label="Zip Code"
		  placeholder="zip code..."
		  name="postalCode"
		  type="text"
		  value={postalCode}
		  onChange={handleChange}
		/>
		<Form.Input
		  fluid
		  required
		  label="Country"
		  placeholder="country..."
		  name="country"
		  type="text"
		  value={country}
		  onChange={handleChange}
		/>
		
		<Button primary
		  icon="signup"
		  type="submit"
		  content="Submit Shipping Info"
		  disabled={!address || !city || !postalCode || !country}
		/>
		
		</Segment>
		</Form>
	</Container> 
);

export default ShippingForm;