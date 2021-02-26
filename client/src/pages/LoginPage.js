import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { loginUser } from "../actions/userActions";
import {
  Button,
  Container,
  Form,
  Icon,
  Message,
  Segment, Dimmer, Loader
} from 'semantic-ui-react';


class Login extends Component{
	 
	constructor() {
		super();
		this.state = {
			user: {
			  email: '',
			  password: ''
			}
		};
	}
	
	componentDidMount() {
	  if (this.props.authInfo.isAuthenticated) {
		this.props.history.push("/");
	  }
	}
	
	onChange = (e) => this.setState({
      user: {...this.state.user, [e.target.name]: e.target.value }
    });
	
	onSubmit = (e) => {
		e.preventDefault();
		// create a string for an HTTP body message
		const email = encodeURIComponent(this.state.user.email);
		const password = encodeURIComponent(this.state.user.password);
		const formData = `email=${email}&password=${password}`;
		this.props.loginUser(formData, this.props.history);
	};
	
	render(){
		const { user } = this.state;
		const { loading, error } = this.props.authInfo;
		const { message } = this.props.authRegister;
		
		return(
			<div className="inputForm">
				<Container text>
					<Form onSubmit={this.onSubmit} className="submitForm">
					  {loading ? (<Dimmer active inverted size="massive"><Loader inverted>Loading...</Loader></Dimmer>)
					  : 
					  error ? <Message className="error-text" content={error.message} />
					  :
					  message ? <Message className="success-text" content={message.message} />
					  : null}
					  <Segment>
						
						<Form.Input
						  fluid
						  required
						  icon="envelope"
						  iconPosition="left"
						  label="Email"
						  placeholder="email..."
						  name="email"
						  type="email"
						  value={user.email}
						  onChange={this.onChange}
						/>
						<Form.Input
						  fluid
						  required
						  icon="lock"
						  iconPosition="left"
						  label="Password"
						  placeholder="password..."
						  name="password"
						  type="password"
						  value={user.password}
						  onChange={this.onChange}
						/>
						<Button primary
						  icon="signup"
						  type="submit"
						  content="Login"
						/>
					  </Segment>
					</Form>
				</Container>
				
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
  authRegister: state.authRegister,
  authInfo: state.authInfo
});


export default connect(mapStateToProps, { loginUser })(Login);