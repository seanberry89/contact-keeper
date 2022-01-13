// Navbar is the navigation component (menu) for the project application

// Navbar Component: import fragment module and hook 'useContext'
import React, { Fragment, useContext } from 'react'

// Navbar Component: import { Link } to create the menu routes
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Navbar Component: import auth context object to access context objects
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

// Navbar Component: de-structure properties 'title' and 'icon' as props
export const Navbar = ({ title, icon }) => {

  // Navbar Component: initialize auth context via hook 'useContext'
  const authContext = useContext(AuthContext);
  
  // Navbar Component: initialize contact context via hook 'useContext'
  const contactContext = useContext(ContactContext);

  // Navbar Component: de-structure states 'isAuthenticated' and 'user' / function 'logout'
  const { isAuthenticated, user, logout } = authContext;
  const { clearContacts } = contactContext;

  // Navbar Component: create function 'onLogout' to call method logout() and clearContacts()
  const onLogout = () => {
    logout();
    clearContacts();
  }

  // Navbar Component: create personal menu for user login
  // Note: insert in-line event listener 'onClick' within element <a> to call method 'onLogout'
  const authLinks = (
    <Fragment>
      <li>Hello { user && user.name }</li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  // Navbar Component: create default menu for user logout
  // Note: element <Link> provides navigation throughout the application and attribute 'to' takes the location's pathname, such as '/register'
  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
         <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  // Navbar Component: substitute the navigation elements <Link> with an ternary operator
  // Ternary Expression: if state 'isAuthenticated' is true then run 'authLinks' or else run 'guestLinks'
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon}></i> {title}
      </h1>
      <ul>
        { isAuthenticated ? authLinks : guestLinks }
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
  icon: 'fas fa-id-card-alt'
}

export default Navbar
