// ContactFilter is the user's search field component inside of the homepage
// Contact Filter: import hook useRef to reference the input element
import React, { useContext, useRef, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
  // Contact Filter: initialize context object via hook useContext()
  const contactContext = useContext(ContactContext);

  // Contact Filter: de-structure state and functions from context object
  const { filtered, filterContacts, clearFilter } = contactContext;

  // Contact Filter: initialize reference element via hook useRef()
  // Note: hook useRef() takes the default value as the param (so the field remains blank)
  const text = useRef('');

  // Contact Filter: set the search field to hold no reference via hook useEffect
  useEffect(() => {
    // Contact Filter: check if the value of state 'filtered' is null (default value)
    if(filtered === null) {
      text.current.value = '';
    }
  });

  // Contact Filter: create event listener method 'onChange'
  const onChange = (e) => {
    // Contact Filter: check if the search field possesses a search value
    // Note: if the value inside of the search field does NOT equal blank then-
    if(text.current.value !== '') {
      // Contact Filter: if search value, return method filterContacts()
      // Note: param 'e.target.value' is the value of the user's search transferred to file ContactState.js
      filterContacts(e.target.value);
    } else {
      // Contact Filter: if no value, return method clearFilter()
      clearFilter();
    }
  }

  return (
    <form>
      <input ref={text} type="text" placeholder="Filter Contacts" onChange={onChange} />
    </form>
  )
}

export default ContactFilter;
