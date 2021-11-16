// ContextState is one of three management files for react applications; this file defines state, action, and returns the Context Provider to all "children" sub-components

import React, { useReducer } from "react";
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types'

// Global State: create arrow function 'ContactState' w/ parameter 'props'
const ContactState = (props) => {
  // Global State: create the default value of the global state via object 'initialState'
  const initialState = {
    // Global State: insert Brad's hard-coded data as the default value of 'contact' (temporary example)
    // Note: state 'contact' will have a default value of an empty array, as the resulting actions of the user will change the value of the state thereafter
    contacts: [
      {
        id: 1,
        name: 'Jill Johnson',
        email: 'jill@gmail.com',
        phone: '111-111-1111',
        type: 'personal'
      },
      {
        id: 2,
        name: 'Sara Watson',
        email: 'sara@gmail.com',
        phone: '222-222-2222',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Harry White',
        email: 'harry@gmail.com',
        phone: '333-333-3333',
        type: 'professional'
      }
    ]
  }

  // Global State: dispatch the global state to the reducer 'contactReducer' via hook 'useReducer'
  // Note: the 'useReducer' hook accepts two arguments: reducer function and initial state, which then returns an array of current state and function dispatch, thus the de-structure:
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // -- Action Functions for the App --

  // Global State: create the arrow function to add a new contact
  // Global State: create the arrow function to delete a saved contact
  // Global State: create the arrow function to set a current contact
  // Global State: create the arrow function to clear a current contact
  // Global State: create the arrow function to update a saved contact
  // Global State: create the arrow function to filter saved contacts
  // Global State: create the arrow function to clear the contact filter

  // Global State: 
  return (
    // Global State: insert the context provider to enable sub-components to subscribe to context changes
    // Note: the context provider takes the prop 'value,' which takes the state/action we want to access from all of the components in the app
    <ContactContext.Provider value={{
      contacts: state.contacts
    }}>
      {props.children}
    </ContactContext.Provider>
  )
};

export default ContactState;