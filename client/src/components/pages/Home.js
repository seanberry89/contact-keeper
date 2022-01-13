// Home is the home component (or homepage) of the project application
// Note: call method loadUser() in component 'home' to prevent the auth states from defaulting to their original values during a page refresh, thus losing the user data

import React, {useContext, useEffect } from 'react'
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter'
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  // Home Component: initialize auth context via hook 'useContext'
  const authContext = useContext(AuthContext);

  // Home Component: call method loadUser() via auth context and hook 'useEffect'
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  },[]);

  return (
    // Home Component: insert a two-column grid of the contact form / contacts components
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  )
}

export default Home;
