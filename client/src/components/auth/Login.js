// Login is the component page inside the project application to login an existing user

// Login Component: import 'useState' hook to enable component-level state
// Note: import hooks 'useContext' and 'useEffects' for authenticating login
import React, { useState, useContext, useEffect } from 'react'

import { Navigate } from 'react-router-dom';

// Login Component: import auth context and alert context
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = () => {
  // Login Component: initialize auth context via hook 'useContext'
  const authContext = useContext(AuthContext);
  
  // Login Component: initialize alert context via hook 'useContext'
  const alertContext = useContext(AlertContext);

  // Login Component: de-structure function 'setAlert' from alert context
  const { setAlert } = alertContext;
  
  // Login Component: de-structure functions 'login' and 'clearErrors' / states 'error' and 'isAuthenticated' from auth context
  const { login, error, clearErrors, isAuthenticated } = authContext;

  // Login Component: create error message via hook 'useEffect'
  useEffect(() => {

    // Login Component: check if there is an duplicate user
    if(error === 'invalid credentials') {
      
      // Login Component: call method setAlert() to create the error message
      // Note: method setAlert() takes two params: state 'error' and class type
      setAlert(error, 'danger');
      
      // Login Component: call method clearErrors() to remove error message afterward
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated ]);


  // Login Component: create new state 'user' and state function 'setUser'
  // Note: hook 'useState' takes out (via de-structure) the new state 'user' and new function 'setUser' which updates the state, while the hook itself takes a parameter of the state's default value 
  const [ user, setUser ] = useState({
    email: '',
    password: ''
  });

  // Login Component: de-structure the properties from new state 'user'
  const { email, password } = user; 

  // Login Component: create event listener function 'onChange' for the input fields
  // Note: arrow function 'onChange' returns single-line called-function 'setUser'
  // Note: function 'setUser' takes a spread operator (...) of state 'user,' then set the field's attribute name to the value of the user's type in the fields, thus selecting the value in each field
  const onChange = (e) => setUser({
    ...user,
    [e.target.name] : e.target.value
  });

  // Login Component: create event listener function 'onSubmit' for the form's submit button
  const onSubmit = (e) => {
    e.preventDefault();
    // Login Component: create error message if the email and password fields are blank
    if(email === '' || password === '') {
      setAlert('please fill in all of the fields', 'danger');
    } else {
      // Login Component: if yes, call method login() to transfer the user data to AuthState.js
      // Note: method login() takes an object parameter with properties of email and password
      login({
        email,
        password
      });
    }
  }

  // Login Component: redirect to Home Component if there is a user login and when state 'isAuthenicated' becomes 'true'
  if(isAuthenticated){
    return <Navigate to='/' />
  }

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} />
        </div>
        <input type="submit" value="Login" className="btn btn-primary btn-block" />
      </form>
    </div>
  )
}

export default Login;
