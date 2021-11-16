// Home is the home component (or homepage) of the project application
import React from 'react'
import Contacts from '../contacts/Contacts';

const Home = () => {
  return (
    // Home Component: insert a two-column grid of the contact form / contacts components
    <div className="grid-2">
      <div>
        {/* Contact Form */}
      </div>
      <div>
        <Contacts />
      </div>
    </div>
  )
}

export default Home;
