// Contact Item represents each contact's container in the Contacts component
import React from 'react'
import PropTypes from 'prop-types';

// Contact Item Component: insert param 'contact' as a prop, which represents each contact 
const ContactItem = ({contact}) => {
  // Contact Item Component: de-structure the contact properties from prop 'contact'
  const { id, name, email, phone, type } = contact;
  
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {/* Contact Item Component: insert properties 'name' and 'type' */}
        {/* Contact Item Component: switch between classes via ternary operator */}
        {name} {''} <span style={{float: 'right'}} className={'badge' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
      </h3>
      <ul className="list">
        {/* Contact Item Component: insert Logical AND expression for property 'email' */}
        {email && (<li>
          <i className="fas-fa-envelope-open"></i> {email}
        </li>)}
        {/* Contact Item Component: insert Logical AND expression for property 'phone' */}
        {phone && (<li>
          <i className="fas-fa-phone"></i> {phone}
        </li>)}
      </ul>
      <p>
        <button className="btn btn-dark btn-sm">Edit</button>
        <button className="btn btn-danger btn-sm">Delete</button>
      </p>
    </div>
  )
}

// Contact Item Component: check for the type of prop 'contact'
ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
}

export default ContactItem;
