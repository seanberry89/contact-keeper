// Contacts is the user's contact-data component in the application (homepage)

import React, { Fragment, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

// Contacts Component: import loading spinner via Spinner.js
import Spinner from '../layout/Spinner';

// Contacts Component: import CSSTransition and TransitionGroup from 'react-transition-group'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Contacts = () => {
  // Contacts Component: initialize the context object via hook useContext()
  // Note: hook useContext() takes in the file of the current context 'ContactContext'
  const contactContext = useContext(ContactContext);

  // Contacts Component: de-structure states 'contacts' and 'filtered' from context 'contactContext'
  // Contacts Component: de-structure state 'loading' / function 'getContacts' from contact context
  const { contacts, filtered, getContacts, loading } = contactContext;

  // Contacts Component: call method 'getContacts' via hook 'useEffect'
  // Note: hook 'useEffect' takes dependencies so insert empty brackets at hook end
  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  // Contacts Component: create alert message if no contacts reside in the UI
  // Note: revise conditional to include new value of state 'contacts'
  // If Statement: if state 'contacts' does NOT equal 'null' AND the length of state 'contacts' equals a value of '0' AND there's NO state 'loading,' then-
  if(contacts !== null && contacts.length === 0 && !loading){
    return <h4>Please Add A New Contact</h4>
  }


  // Contacts Component: create conditional to decide user's contacts or loading spinner
  // Ternary: if state 'contacts' does NOT equal 'null' and there's NO state 'loading,' then run TransitionGroup or else run component Spinner

  return (
    <Fragment>
      { contacts !== null && !loading ? (<TransitionGroup>
      
      {/* Contacts Component: insert expression of a ternary operator to return component <ContactItem/> of the data in state 'filtered' or state 'contacts' */}
      {/* Notes: method map() takes a callback arrow function and param 'contact' which selects each contact */}
      { filtered !== null ? filtered.map(contact => (
        
        // Contacts Component: insert <CSSTransition> to select the targeted elements in the UI
        // Note: <CSSTransition> takes three attributes: key, timeout, and classNames
        // Note: move prop 'key' from <ContactItem> to <CSSTransition> to transition the selected contact
        // Note: edit property 'id' to '_id' since MongoDB uses the underscore in the name (backend)
        <CSSTransition key={contact._id} timeout={1000} classNames="item">

          {/* // Note: component <ContactItem/> takes prop 'contact,' thus sharing the contact data with component <ContactItem/>  */}
          <ContactItem contact={contact} />

        </CSSTransition>
      )) : contacts.map(contact => (

        // Contacts Component: insert <CSSTransition> to select the targeted elements in the UI
        // Note: <CSSTransition> takes three attributes: key, timeout, and classNames
        // Note: move prop 'key' from <ContactItem> to <CSSTransition> to transition the selected contact
        // Note: edit property 'id' to '_id' since MongoDB uses the underscore in the name (backend)
        <CSSTransition key={contact._id} timeout={1000} classNames="item">

          <ContactItem contact={contact} />

        </CSSTransition>
      ))}
      </TransitionGroup>) : <Spinner/> } 
    </Fragment>
  )
}

export default Contacts;
