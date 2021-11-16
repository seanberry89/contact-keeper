// Contacts is the user's contact-data component in the application (homepage)

import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
  // Contacts Component: initialize the context object via hook useContext()
  // Note: hook useContext() takes in the file of the current context 'ContactContext'
  const contactContext = useContext(ContactContext);

  // Contacts Component: de-structure state 'contacts' from context 'contactContext'
  const { contacts } = contactContext;

  return (
    <Fragment>
      {/* Contacts Component: return the loop through of state 'contacts' via method map() */}
      {/* Notes: method map() takes a callback arrow function and param 'contact' which is per each contact */}
      {contacts.map(contact => {
        // Contacts Component: insert component <ContactItem/> inside the Contact's UI
        // Note: component <ContactItem/> takes prop 'contact,' thus sharing the contact data with component <ContactItem/> 
        // <ContactItem key={contact.id} contact={contact} />
        <h3>{contact.name}</h3>
      })}
    </Fragment>
  )
}

export default Contacts;
