import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class NotFound extends Component{
	
  render(){
	return(
	  <div className="notFound">
	    <p>That URL doesn't match any page</p>
		
		<a href="/">Return Home</a>
	  </div>
	)
  }
}

export default NotFound;