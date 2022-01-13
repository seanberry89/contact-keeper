// Contact Item represents each contact's container in the Contacts component
import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

// Contact Item Component: insert param 'contact' as a prop, which represents each contact 
const ContactItem = ({contact}) => {
  // Contact Item Component: initialize context object via hook useContext
  const contactContext = useContext(ContactContext);

  // Contact Item Component: de-structure method deleteContact from context object
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  // Contact Item Component: de-structure the contact properties from prop 'contact'
  // Note: rewrite property 'id' to '_id' which is the assigned property in MongoDB
  const { _id, name, email, phone, type } = contact;

  // Contact Item Component: create event listener function 'onDelete'
  // Note: rewrite property 'id' to '_id' which is the assigned property in MongoDB
  const onDelete = () => {
    // Contact Item Component: call function deleteContact w/ param 'id'
    deleteContact(_id);
    // Contact Item Component: call function clearCurrent to remove the contact from the contact form
    clearCurrent();
  }
  
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {/* Contact Item Component: insert properties 'name' and 'type' */}
        {/* Contact Item Component: switch between classes via ternary operator */}
        {name} {''} <span style={{float: 'right'}} className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
      </h3>
      <ul className="list">
        {/* Contact Item Component: insert Logical AND expression for property 'email' */}
        {email && (<li>
          <i className="fas fa-envelope-open"></i> {email}
        </li>)}
        {/* Contact Item Component: insert Logical AND expression for property 'phone' */}
        {phone && (<li>
          <i className="fas fa-phone"></i> {phone}
        </li>)}
      </ul>
      <p>
        {/* Contact Item Component: insert in-line event listener to call function 'setCurrent' */}
        {/* Note: method setCurrent takes param 'contact' as the selected contact set to the form */}
        <button className="btn btn-dark btn-sm" onClick={() => setCurrent(contact)}>Edit</button>
        {/* Contact Item Component: insert in-line event listener to call function 'onDelete' */}
        <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
      </p>
    </div>
  )
}

// Contact Item Component: check for the type of prop 'contact'
ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
}

export default ContactItem;
