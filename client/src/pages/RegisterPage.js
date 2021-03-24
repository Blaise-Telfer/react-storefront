import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../actions/userActions";
import {
  Button,
  Container,
  Form,
  Icon,
  Message,
  Segment, Dimmer, Loader
} from 'semantic-ui-react';


class Register extends Component{
	
	state = {
	  user: {
		username: "",
		firstname: "",
		lastname: "",
		email: "",
		location: "",
		password: "",
		confirmPassword: ""
	  },
	};
	
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
		const newUser = {
			username: this.state.user.username,
			email: this.state.user.email,
			password: this.state.user.password,
			confirmPassword: this.state.user.confirmPassword
		};
		this.props.registerUser(newUser, this.props.history);
	};
	
	render(){
		const { user } = this.state;
		const { loading, error } = this.props.authRegister;
		
		return(
			<div className="inputForm">
				<Container text>
				
					<Form onSubmit={this.onSubmit} className="submitForm">
					  {loading ? (<Dimmer active inverted size="massive"><Loader inverted>Loading...</Loader></Dimmer>)
					  : 
					  error ? <Message className="error-text" content={error.message} />
					  : null}
					  <Segment>
					    
						<Form.Input
						  fluid
						  required
						  icon="user"
						  iconPosition="left"
						  label="Username"
						  placeholder="username..."
						  name="username"
						  value={user.username}
						  onChange={this.onChange}
						/>
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
						<Form.Input
						  fluid
						  required
						  icon="lock"
						  iconPosition="left"
						  label="Confirm Password"
						  placeholder="confirm password..."
						  name="confirmPassword"
						  type="password"
						  value={user.confirmPassword}
						  onChange={this.onChange}
						/>
						<Button primary
						  icon="signup"
						  type="submit"
						  content="Signup"
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

export default connect(mapStateToProps, { registerUser })(withRouter(Register));