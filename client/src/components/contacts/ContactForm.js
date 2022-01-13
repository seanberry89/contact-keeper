// Contact Form is the user's contact-form component for creating new contacts in the homepage

// Contact Form Component: import hook 'useState' to edit a component-level state
// Contact Form Component: import hook 'useEffect' to render a component-level effect
import React, { useState, useContext, useEffect } from 'react';
// Contact Form Component: import the context object via file ContactContext.js
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  // Contact Form Component: initialize context object via variable 'contactContext'
  const contactContext = useContext(ContactContext);

  // Contact Form Component: de-structure state 'current' and methods from the context object
  const { addContact, updateContact, clearCurrent, current } = contactContext;

  // Contact Form Component: update the contact form via hook 'useEffect'
  // Note: hook 'useEffect' acts as a replacement of method componentDidMount(), which renders a block of code as the DOM updates
  useEffect(() => {
    // Contact Form Component: check if there is a selected contact to edit via if-statement
    if(current !== null){
      // Contact Form Component: if so, call method setContact() to set a contact in the contact form
      // Note: method setContact() takes param 'current' which is the selected contact data
      setContact(current);
    } else {
      // Contact Form Component: if no, call method setContact() to set the state to default values
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }
    // Contact Form Component: add dependenices to hook 'useEffect'
  }, [contactContext, current]); 

  // Contact Form Component: create new state 'contact'
  // Note: hook 'useState' takes out (via de-structure) the new state 'contact' and new function to update the state 'setContact' while the hook itself takes a param of the state's default value
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  // Contact Form Component: de-structure the contact properties from new state 'contact'
  const {name, email, phone, type} = contact;

  // Contact Form Component: create event listener onChange to change the state 'contact'
  // Note: method onChange takes the param (e) as it's an in-line event listener in <input>
  // Note: method setContact takes in an object
  const onChange = (e) => setContact({ ...contact, [e.target.name] : e.target.value});

  // Contact Form Component: create method onSubmit to add a new contact via submit button
  const onSubmit = (e) => {
    e.preventDefault();
    // Contact Form Component: check if there is a contact in the contact form via if-statement
    if(current === null){
      // Contact Form Component: if empty, call function addContact() to add a new contact via submit button
      addContact(contact);
    } else {
      // Contact Form Component if contact, then call method updateContact()
      updateContact(contact);
    }
    // Contact Form Component: clear the form's fields afterward via called method clearAll()
    clearAll();
  }

  // Contact Form Component: create arrow function 'clearAll' to clear the contact data
  const clearAll = () => {
    // Contact Form Component: call function clearCurrent via context object
    clearCurrent();
  }

  return (
    // Contact Form Component: substitute main <div> w/ <form> element
    // Note: element <form> takes in the in-line event listener 'onSubmit'
    // Note: insert a ternary operator to edit the header text in the contact form
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
      {/* Contact Form Component: create the input fields for each of the contact properties */}
      {/* Note: in-line method 'onChange' is the called function for updating state 'contact' */}
      {/* Note: properties 'value' and 'name' for each of the fields assists method 'onChange' with updating state 'contact' */}
      <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} />
      <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} />
      <input type="text" placeholder="Phone" name="phone" value={phone} onChange={onChange} />
      <h5>Contact Type</h5>
      <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onChange} /> Personal {''}
      <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange={onChange} /> Professional
      <div>
        {/* Contact Form Component: use a ternary to edit the submit button in the contact form */}
        <input type="submit" value={current ? 'Update Contact' : 'Add Contact'} className="btn btn-primary btn-block" />
      </div>
      {/* Contact Form Component: use logical AND to create a clear button in the contact form */}
      {/* Logical And: if 'current' is true, meaning there is a selected contact, then create a clear button */}
      {/* Note: event listener 'onClick' calls function 'clearAll' to clear the contact data */}
      {current && (<div>
        <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
      </div>)}
    </form>
  )
}

export default ContactForm;
