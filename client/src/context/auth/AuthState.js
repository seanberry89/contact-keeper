// AuthState is one of three state management files for the authentication of this react application; this file defines state, action, and returns the Context Provider for all "children" sub-components

import React, { useReducer } from 'react'
// Auth State: import 'axios' to enable a request to fetch the user's registration data
// Note: Axios is a promised-based HTTP client that allows you to make a request to a given endpoint
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types'

// Auth State: import utility file setAuthToken
import setAuthToken from '../../utils/setAuthToken';

// Auth State: create arrow function 'AuthState' w/ parameter 'props'
const AuthState = (props) => {
  // Auth State: create the default value of the global state via object 'initialState'
  const initialState = {
    // Auth State: create five global states - token, isAuthenticated, user, loading, and error
    // Note: the default value of state 'token' is retrieving item 'token' from local storage
    // Note: state 'isAuthenticated' is whether the user is logged in or not
    // Note: state 'loading' is whether there is a fetch request or not
    // Note: state 'user' determines the selected user
    // Note: state 'error' is whether there is a fetch error or not
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  // Auth State: dispatch the global state to reducer 'authReducer' via hook 'useReducer'
  // Note: hook useReducer() accepts two arguments: the reducer function and initial state, which returns an array of current state and dispatch function, thus the de-structure in the beginning
  const [ state, dispatch ] = useReducer(authReducer, initialState);

  // Auth State: create arrow function 'loadUser' to authenticate user and fetch user data
  // Note: async function because of its request to the backend
  const loadUser = async () => {
    
    // Auth State: check if there is a token in local storage via if statement
    if(localStorage.token) {
      // Auth State: if so, call method setAuthToken to set the token into the default header
      // Note: method setAuthToken() takes the parameter 'localStorage.token,' which is the token in LS
      setAuthToken(localStorage.token);
    }
    
    // Auth State: retrieve the user data from backend (MongoDB) via method get() and URL destination via try/catch statement
    try {
      const response = await axios.get('/api/auth');
      // Auth State: if so, call method dispatch() to dispatch global action 'USER_LOADED' and payload 'response.data,' which is the user data, to the reducer 'authReducer'
      dispatch({
        type: USER_LOADED,
        payload: response.data
      }); 
    } catch (error) {
      // Auth State: if not, call method dispatch() to dispatch global action 'AUTH_ERROR'
      dispatch({ type: AUTH_ERROR });
    }
  }
  
  // Auth State: create arrow function 'register' to register a new user
  // Note: function takes param 'formData' as the data from the registration form via Register.js
  const register = async (formData) => {
    // Auth State: define the file format of the content-type via object 'config'
    // Note: Content-Type header is used to indicate the media type of the response to the server
    // Note: the browser receives the file format and loads the type of content on the machine
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    // Auth State: try/catch a post request via axios
    // Note: the 'try statement' will check for errors while a block of code is executed
    // Note: the 'catch statement' will execute a block of code if an error is found
    // Note: request method post() takes three params: file destination, file data, and file type
    try {
      const response = await axios.post('/api/users', formData, config);
       // Auth State: if post is successful: dispatch function REGISTER_SUCCESS to the reducer via method dispatch() 
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data
      });

      // Auth State: call function loadUser() to authenticate user / fetch user data AFTER registration
      loadUser();

    } catch(error) {
      // Auth State: if post is unsuccesful: dispatch function REGISTER_FAIL to the reducer via method dispatch()
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.msg
      });
    }
  }


  // Auth State: create arrow function 'login' to log a user into the application
  // Note: function takes param 'formData' as the data from the registration form via Register.js
  const login = async (formData) => {
    // Auth State: define the file format of the content-type via object 'config'
    // Note: Content-Type header is used to indicate the media type of the response to the server
    // Note: the browser receives the file format and loads the type of content on the machine
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    // Auth State: try/catch a post request via axios
    // Note: the 'try statement' will check for errors while a block of code is executed
    // Note: the 'catch statement' will execute a block of code if an error is found
    // Note: request method post() takes three params: file destination, file data, and file type
    try {
      const response = await axios.post('/api/auth', formData, config);
       // Auth State: if post is successful: dispatch function LOGIN_SUCCESS to the reducer via method dispatch() 
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data
      });

      // Auth State: call function loadUser() to authenticate user / fetch user data AFTER login
      loadUser();

    } catch(error) {
      // Auth State: if post is unsuccesful: dispatch function LOGIN_FAIL to the reducer via method dispatch()
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.msg
      });
    }
  }

  // Auth State: create arrow function 'logout' to log a user out of the application
  // Note: single-line arrow functions do not need brackets at the end of the arrow function
  const logout = () => dispatch({ type: LOGOUT });
  
  // Auth State: create arrow function 'clearErrors' to clear fetch errors
  // Note: function clearErrors is a singe-line arrow function that runs method dispatch() to dispatch the environmental action CLEAR_ERRORS to the reducer
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS })

  return (
    // Auth State: return <AuthContext.Provider> enables the descendants or sub-components to subscribe to the context changes (which involves the whole UI)
    // Note: the Provider takes the prop 'value,' which takes the state/action we want to access throughout all of the components in the app 
    <AuthContext.Provider value={{
      token: state.token,
      isAuthenticated: state.isAuthenticated,
      loading: state.loading,
      user: state.user,
      error: state.error,
      register,
      login,
      logout,
      clearErrors,
      loadUser
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;
