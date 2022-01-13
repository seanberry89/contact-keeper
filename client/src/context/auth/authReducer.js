// AuthReducer is one of three management files for react applications; the file takes two arguments, the current state and the action, and returns a new state

// Auth Reducer: import environmental variables (actions) from file types.js
import {
  REIGSTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  REGISTER_SUCCESS
} from '../types';

// Auth Reducer: export default the reducer arrow function
// Note: reducer takes two params: current state and action
export default (state, action) => {
  // Auth Reducer: execute one of multiple listed actions via switch statement
  // Note: switch statement select one of multiple code blocks to be executed
  switch(action.type) {
    
    case USER_LOADED:
      // Note: enables state 'isAuthenticated' to be 'true' and state 'user' to receive the user data 
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      }

    case REGISTER_SUCCESS:
    // Auth Reducer: stack case 'LOGIN_SUCCESS' below the above case to receive the same state edits
    case LOGIN_SUCCESS:
      // Auth Reducer: set the register data / token to local storage via setItem()
      // Note: method setItem() takes two params: key name and key value
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        // Auth Reducer: insert spread operator (...) to copy/paste the token in object action.payload
        ...action.payload,
        isAuthenticated: true,
        loading: false
      }

      case REGISTER_FAIL:
      // Auth Reducer: stack case 'AUTH_ERROR' below the above case to receive the same state edits
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT:
        // Auth Reducer: remove the register token from local storage via removeItem()
        // Note: return the default value of all states except state 'error,' which returns the payload
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
          error: action.payload
      }

      case CLEAR_ERRORS:
        return {
          ...state,
          error: null
        }

      default: 
      return state;
  }
}
