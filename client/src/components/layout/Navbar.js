// Navbar is the navigation component for the project application
import React from 'react'
// Navbar Component: import { Link } to create the menu routes
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Navbar Component: de-structure properties 'title' and 'icon' as props
export const Navbar = ({ title, icon }) => {
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon}></i> {title}
      </h1>
      {/* Navbar Component: insert <ul> and <li> to contain the menu <Link> */}
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  )
}

// Navbar Component: check the type of the two props via PropTypes
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
}

// Navbar Component: create the default values of the two props: title and icon
// Note: property 'defaultProps' defines default values for the component's props
Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas-fa-card-alt'
}

export default Navbar
