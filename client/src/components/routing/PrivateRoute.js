// PrivateRoute is a route file for creating a Private Route and implementing the secure route to the main file: app.js

import React, { Children, Fragment, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

// Private Route: de-structure property 'component' and assign its value to 'Component'
// Note: include the rest operator as a parameter to compile the rest of the properties from component 'PrivateRoute' as a new object, which is the standard method to create a private route component in React
const PrivateRoute = ( { children } ) => {
  // Private Route: initialize auth context via hook 'useContext'
  const authContext = useContext(AuthContext);

  // Private Route: de-structure states 'isAuthenticated' and 'loading' from auth context
  const { isAuthenticated, loading } = authContext;

  // Private Route: render the route of two components based on the value of states via ternary operator
  // Note: <Route> specifies a component to render when the browser reaches a certain URL pathway
  // Note: render prop takes an arrow function that returns a component and a parameter 'props'
  // Note: insert a spread operator (...) of props to transfer all props to the new component

  return (
    <Fragment>
      {!isAuthenticated && !loading ? (
        <Navigate to='/login' />
      ) : children }
    </Fragment>
  )
}

export default PrivateRoute; 

// Route Notes: 
// * Public Routes are Login, Signup, Forgot Password, or Reset Password components
// * Private Routes are User Profile, App Settings, App Dashboard, etc
// * v6 redirect update reference link: https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5
// * v6 update replaces <Redirect> with <Navigate>