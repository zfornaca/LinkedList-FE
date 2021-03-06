import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * ProtectedRoute replaces a regular Route component whenever we want
 *  to selectively permit access based on if the user is authenticated.
 *  It will redirect non-authenticated users.
 */
export default class ProtectedRoute extends Component {
  render() {
    const {
      isAuthenticated,
      component: RouteComponent,
      ...propsForRoute
    } = this.props;

    // the component to be rendered by the Route, or a Redirect if not logged in
    function ChildComponent(props) {
      if (isAuthenticated) {
        // pass-thru if authenticated
        return <RouteComponent {...props} />;
      } else {
        // redirect if not authenticated
        return <Redirect to="/login" />;
      }
    }

    return (
      <Route
        {...propsForRoute}
        render={routerProps => <ChildComponent {...routerProps} />}
      />
    );
  }
}

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired
};
