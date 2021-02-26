import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, authInfo, ...rest }) => (
  <Route
    {...rest}
    render = {props =>
      authInfo.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  authInfo: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authInfo: state.authInfo
});

export default connect(mapStateToProps)(PrivateRoute);
