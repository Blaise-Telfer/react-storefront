import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { addCategory } from "../actions/categoryActions";
import {
	Button,
	Container,
	Form,
	Icon,
	Message,
	Segment, Dimmer, Loader
  } from 'semantic-ui-react';


class AddCategory extends Component{
  constructor() {
    super();
	this.state = {
	  category: {
        name: "",
        description: ""
	  }
    };
  }
	
  onChange = (e) => this.setState({
	category: {...this.state.category, [e.target.name]: e.target.value }
  });
	
  onSubmit = (e) => {
	e.preventDefault();
	const categoryData ={
	  name: this.state.category.name,
	  categoryId: this.state.category.description
	}
	this.props.addCategory(categoryData, this.props.history);
  };
	
	render(){
		const { errors, category } = this.state;
		const { loading, error } = this.props.categoryCreate;
		
		return(
			<div className="inputForm">
				<h1>New Category</h1>
				
				{loading ? <Dimmer active inverted size="massive"><Loader inverted>Loading...</Loader></Dimmer>
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
						  value={category.name}
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
						  value={category.description}
						  onChange={this.onChange}
						/>
						
						<Button primary
						  icon="signup"
						  type="submit"
						  content="Create Category"
						/>
					  </Segment>
					</Form>
				</Container>
			</div>
		)
	}
}


const mapStateToProps = state => ({
    categoryCreate: state.categoryCreate
});

export default connect(mapStateToProps, {addCategory})(AddCategory);