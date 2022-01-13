// AlertState is one of three state management files for the alert messages in the react application; this file defines state, action, and returns the Context Provider for all "children" sub-components

import React, {useReducer} from 'react';
// Alert State: import 'uuid' package to create a unique identifier for the alert array
import {v4 as uuidv4} from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import {
  SET_ALERT,
  REMOVE_ALERT
} from '../types';

// Alert State: create arrow function 'AlertState' w/ parameter 'props'
const AlertState = (props) => {
  // Alert State: create the default value of the global state via initialState
  // Note: default value of empty array will later be an array of alert objects
  const initialState = [];

  // Alert State: dispatch the global state to reducer 'alertReducer' via hook 'useReducer'
  // Note: hook useReducer() accepts two arguments: reducer function and initial state, which returns an array of current state and dispatch function, thus the de-structure from the beginning
  const [state, dispatch ] = useReducer(alertReducer, initialState);

  // Alert State: create arrow function 'setAlert' to set the alert message
  const setAlert = (msg, type) => {
    // Alert State: create a random id for each alert message via method v4()
    const id = uuidv4();
    // Alert State: dispatch function 'setAlert' to the reducer via method dispatch()
    // Note: method dispatch() takes an object with properties 'type' and 'payload'
    // Note: property 'payload' equals an object of 'msg,' 'type,' and 'id'
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id }
    });

    // Alert State: insert function setTimeout() to remove the alert message after a select time
    // Note: method setTimeout runs a single-line called-function dispatch(), which takes the 'type' as REMOVE_ALERT and the 'payload' as 'id' so the function identifies the alert message to remove
    setTimeout(() => dispatch({
      type: REMOVE_ALERT,
      payload: id
    }), 5000)
  }

  return (
    // Alert State: return <AlertContext.Provider> enables the descendants or sub-components to subscribe to context changes
    // Note: the Provider takes the prop 'value,' which takes the state/action we want to access throughout all of the project's components
    <AlertContext.Provider value={{
      alerts: state,
      setAlert
    }}>
      {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState;