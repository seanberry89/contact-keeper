// ContactState is one of three management files for react applications; this file defines state, action, and returns the Context Provider to all "children" sub-components

import React, { useReducer } from "react";
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  GET_CONTACTS,
  DELETE_CONTACT,
  CLEAR_CONTACTS,
  CONTACT_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types'
import axios from "axios";

// Contact State: create arrow function 'ContactState' w/ parameter 'props'
const ContactState = (props) => {
  // Contact State: create the default value of the global state via object 'initialState'
  const initialState = {
    // Contact State: insert Brad's hard-coded data as the default value of 'contact' (temporary example)
    // Note: state 'contact' will have a default value of an empty array.. but as of 01-12-22, due to an error message issue, the value of state 'contacts' should be 'null' 
    contacts: null,
    // Contact State: create new state 'current' which is the selected contact to edit
    // Note: state 'current' represents the selected contact in the contact form
    current: null,
    // Contact State: create new state 'filtered' which is the searched contact via search field
    filtered: null, 
    // Contact State: create new state 'error' which is the error messages
    error: null
  }

  // Contact: State: dispatch the global state to the reducer 'contactReducer' via hook 'useReducer'
  // Note: the 'useReducer' hook accepts two arguments: reducer function and initial state, which then returns an array of current state and function dispatch, thus the de-structure:
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // -- Action Functions for the App --

  // Contact State: create arrow function 'addContact' to add a new contact
  // Note: method addContact takes param 'contact' which is the form data from file ContactForm.js
  // Note: arrow functions  require 'async' for HTTP requests
  const addContact = async (contact) => {

    // Contact State: define the file format of the content-type via object 'config'
    // Note: the Content-Type header is used to indicate the media type for the response to the server
    // Note: the browser receives the file format and loads the type of content on the machine
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    // Contact State: rewrite method dispatch() as a try/catch post via axios
    // Note: method post() takes three params: file destination, file data, and file type
    try {
      const response = await axios.post('/api/contacts', contact, config);
    // Contact State: dispatch function addContact to the reducer via method dispatch()
    // Note: 'response.data' is the contact data from the post request to the server
    dispatch({
      type: ADD_CONTACT,
      payload: response.data
    });

    } catch (error) {
      // Contact State: dispatch action 'CONTACT_ERROR' to the reducer via method dispatch()
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg
      });
    }
  }

  // Contact State: create async arrow function 'getContacts' to request data from the backend
  // Note: arrow functions require async for HTTP requests 
  // Note: no 'config' file for the request as there is no data sent to the backend
  const getContacts = async () => {
    
    // Contact State: rewrite method dispatch() as a try/catch get request via axios
    // Note: method get() takes the file destination
    try {
      const response = await axios.get('/api/contacts');
    // Contact State: dispatch function addContact to the reducer via method dispatch()
    // Note: 'response.data' is the contact data from the post request to the server
        dispatch({
          type: GET_CONTACTS,
          payload: response.data
        });

    } catch (error) {
      // Contact State: dispatch action 'CONTACT_ERROR' to the reducer via method dispatch()
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg
      });
    }
  }

  // Contact State: create arrow function 'deleteContact' to delete a saved contact
  // Note: method deleteContact takes param 'id' which is the selected contact to delete
  // Note: rewrite 'deleteContact' as an async function / delete request to the backend
  const deleteContact = async (id) => {
    // Contact State: create method dispatch() as a try/catch delete request via axios
    // Note: method delete() takes the file destination as no data goes to the backend
    // Note: no rewrite of property 'id' needed as the parameter is just a placeholder name for the requested data
    try {
      await axios.delete(`/api/contacts/${id}`);
    // Contact State: dispatch function addContact to the reducer via method dispatch()
    // Note: 'response.data' is the contact data from the post request to the server
        dispatch({
          type: DELETE_CONTACT,
          payload: id
        });

    } catch (error) {
      // Contact State: dispatch action 'CONTACT_ERROR' to the reducer via method dispatch()
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg
      });
    }
  }

  // Contact State: create arrow function 'setCurrent' to set a contact in the contact form
  // Note: method setCurrent takes param 'contact' as the selected contact in the form, which comes from file ContactItem.js
  const setCurrent = (contact) => {
    // Contact State: dispatch function setCurrent to the reducer via method dispatch()
    dispatch({
      type: SET_CURRENT,
      payload: contact
    });
  }

  // Contact State: create arrow function 'clearCurrent' to remove a contact from the contact form
  // Note: method clearCurrent takes NO param as there is no data payload for removing a contact
  const clearCurrent = () => {
    // Contact State: dispatch function clearCurrent to the reducer via method dispatch()
    dispatch({
      type: CLEAR_CURRENT
    });
  }

  // Contact State: create arrow function 'updateContact' to update a saved contact
  const updateContact = (contact) => {
    // Contact State: dispatch function updateContact to the reducer via method dispatch()
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact
    });
  } 

  // Contact State: create arrow function 'filterContacts' to filter searched contact
  // Note: method filterContacts takes param 'text' which is the user's text in the search field
  const filterContacts = (text) => {
    // Contact State: dispatch function 'filterContacts' to the reducer via method dispatch()
    dispatch({
      type: FILTER_CONTACTS,
      payload: text
    });
  }

  // Contact State: create arrow function 'clearContacts' to clear a user's contacts during logout
  const clearContacts = () => {
    dispatch({
      type: CLEAR_CONTACTS
    });
  }

  // Contact State: create arrow function 'clearFilter' to clear the search field
  const clearFilter = () => {
    // Contact State: dispatch function 'clearFilter' to the reducer via method dispatch()
    dispatch({
      type: CLEAR_FILTER
    })
  }

  // Contact State: create arrow function 'contactError' to create an error message
  const contactError = () => {
    // Contact State: dispatch action 'CONTACT_ERROR' to the reducer via method dispatch()
    dispatch({
      type: CONTACT_ERROR
    });
  }

  return (
    // Contact State: insert the context provider to enable sub-components to subscribe to context changes
    // Note: the context provider takes the prop 'value,' which takes the state/action we want to access from all of the components in the app
    <ContactContext.Provider value={{
      contacts: state.contacts,
      current: state.current,
      filtered: state.filtered,
      error: state.error,
      addContact,
      deleteContact,
      setCurrent,
      clearCurrent,
      updateContact,
      filterContacts,
      clearFilter,
      contactError,
      getContacts,
      clearContacts
    }}>
      {props.children}
    </ContactContext.Provider>
  )
};

export default ContactState;