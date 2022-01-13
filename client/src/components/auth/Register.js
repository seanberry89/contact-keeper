// Register is the component page inside the project application to register a new user

// Register Component: import 'useState' hook to enable component-level state
import React, { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = () => {
  // Register Component: initialize alert context object via useContext()
  const alertContext = useContext(AlertContext);
  
  // Register Component: initialize auth context object via useContext()
  const authContext = useContext(AuthContext);
  
  // Register Component: de-structure method 'setAlert' from alert context object
  const { setAlert } = alertContext; 
  
  // Register Component: de-structure method 'register' and 'clear'Errors' from auth context object
  const { register, error, clearErrors, isAuthenticated } = authContext; 

  // Register Component: create error message via hook 'useEffect'
  // Note: hook 'useEffect' acts a replacement of method componentDidMount(), which renders a block of code (as a side effect) AFTER the load of the DOM
  // Note: add state 'error' as a dependency, so the hook runs when a new error has been generated only
  useEffect(() => {

    // Register Component: check if there is a duplicate registration
    // If Statement: state 'error' equals a string message, meaning duplicate registration, then-
    if(error === 'this user already exists') {
      // Register Component: call method setAlert()
      // Note: method setAlert() takes two params: state 'error' and type 'danger'
      setAlert(error, 'danger');
      // Register Component: call method clearErrors()
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated ] );

  // Register Component: create new state 'user' and state function 'setUser'
  // Note: hook 'useState' takes out (via de-structure) the new state 'user' and new function 'setUser' which updates the state, while the hook itself takes a parameter of the state's default value 
  const [ user, setUser ] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  // Register Component: de-structure the properties from new state 'user'
  const { name, email, password, password2 } = user; 

  // Register Component: create event listener function 'onChange' for the input fields
  // Note: arrow function 'onChange' returns single-line called-function 'setUser'
  // Note: function 'setUser' takes a spread operator (...) of state 'user,' then set the field's attribute name to the value of the user's type in the input fields, thus selecting the value in each field
  const onChange = (e) => setUser({
    ...user,
    [e.target.name] : e.target.value
  });

  // Register Component: create event listener function 'onSubmit' for the form's submit button
  const onSubmit = (e) => {
    // Register Component: check if the registration fields are blank via if statement
    if(name === '' || email === '' || password === '') {
      // Register Component: if so, call function setAlert()
      // Note: method setAlert() takes two parameters: alert message and alert type, which is transferred to the state management file AlertState.js
      setAlert('please enter all fields', 'danger');
      // Register Component: check if the passwords match via if statement
    } else if(password !== password2) {
      setAlert('passwords do not match', 'danger');
    } else {
      // Auth State: if no error, then call method register() to submit the form data to file AuthState.js
      // Note: method register() takes param of an object containing the registration data: name, email, and password
      register({
        name,
        email,
        password
      });
    }
    e.preventDefault();
  }

  // Register Component: redirect to Home Component after registration and when 'isAuthenticated' becomes true
  if(isAuthenticated){
    return <Navigate to='/' />;
  }

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required minLength="6" />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" name="password2" value={password2} onChange={onChange} required minLength="6" />
        </div>
        <input type="submit" value="Register" className="btn btn-primary btn-block" />
      </form>
    </div>
  )
}

export default Register;
