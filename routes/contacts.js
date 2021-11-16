// Contacts is a basic CRUD (create, read, update, delete) route to the backend of the project application (express server)

// Contacts Route: add express server to file contacts.js (to obtain the router object)
const express = require('express');

// Contacts Route: variable 'router' equals a new router object
const router = express.Router();

// Contacts Route: include module 'express-validator' to route contacts via method require()
// Note: insert 'check' as the parameter to use method check() in the POST request
const { check, validationResult } = require('express-validator');

// Contacts Route: include middleware file 'auth' to authenticate contacts route
const auth = require('../middleware/auth');

// Contacts Route: include the User model to file users.js via method require()
// Note: method require() is used to include modules that exist in separate files
const User = require('../models/User');

// Contacts Route: include the Contact model to file contacts.js via method require()
const Contact = require('../models/Contact');

// Route Notes: 
// @route -- GET -- api/contacts
// @description -- retrieve all user contacts
// @access -- private

// Contacts Route: create a GET request from the new router object
// Contacts Route: authenticate the GET request w/ parameter 'auth'
router.get('/', auth, async (request, response) => {
  // Contacts Route: retrieve the user data from the database via try/catch
  try {
    // Contacts Route: retrieve the user id from property 'user' via method find()
    // Note: user id is the hook for retrieving the saved user's contacts
    const contacts = await Contact.find( { user: request.user.id } ).sort( { date: -1} );

    // Contacts Route: retrieve the user data from the response object via json format
    response.json(contacts);
  } catch(error) {
    console.error(error.message);
    response.status(500).send('server error');
  }
});

// Route Notes: 
// @route -- POST -- api/contacts
// @description -- add new contact(s) in the project application
// @access -- private

// Contacts Route: create a POST request from the new router object
// Contacts Route: authenticate the POST request with parameter 'auth' (middleware)
// Contacts Route: add validation as a second parameter in the POST request (middleware)
// Note: authenticate request as its a private route (after logging into the app)
router.post('/', [auth, [
  check('name', 'contact name is required').not().isEmpty()
]], async (request, response) => {
  // Contacts Route: check for validation errors via method validationResult()
  // Note: method validationResult() extracts the validation errors from a request and makes them available in object 'Result'
  const errors = validationResult(request);

  // Contacts Route: check if the validation is an empty request via if-statement
  // If-Statement: if NOT 'errors' is empty, meaning they're empty fields, then-
  if(!errors.isEmpty()){
    return response.status(400).json( { errors: errors.array() } );
  }

  // Contacts Route: de-structure the contact properties from request.body
  const { name, email, phone, type } = request.body;

  // Contacts Route: check if the request for a new contact reaches the database via try/catch
  try {

    // Conctacts Route: create a new contact via constructor new Contact()
    // Note: new Contact() takes in an object of the four properties: name, email, phone, type
    // Note: new Contact() creates an instance of a new contact
    const newContact = new Contact({
      name,
      email,
      phone,
      type,
      user: request.user.id
    });

    // Contacts Route: save the new contact in the database via method save()
    const contact = await newContact.save();

    // Contacts Route: return the new contact to the app via response object / json format
    response.json(contact);

  } catch(error) {
    console.error(error.message);
    response.status(500).send('unable to create a new contact');
  }
});

// Route Notes: 
// @route -- PUT -- api/contacts/:id
// @description -- update a saved contact in the application
// @access -- private

// Contacts Route: create a PUT request from the new router object
// Contacts Route: authenticate the PUT request with parameter 'auth' (middleware)
// Note: authenticate request as its a private route (after logging into the app)
router.put('/:id', auth, async (request, response) => {
  // Contacts Route: de-structure the contact data from request.body
  const { name, email, phone, type } = request.body;

  // Contacts Route: check/add the updated contact data to empty object 'contactFields'
  const contactFields = {};
  if(name) contactFields.name = name;
  if(email) contactFields.email = email;
  if(phone) contactFields.phone = phone;
  if(type) contactFields.type = type;

  // Contacts Route: check if the request to update a contact reaches the database
  try {
    // Contacts Route: find the saved contact in the database via method findById()
    // Note: access the parameter of the selected contact via 'request.params.id,' as the request's '/:id' is the contact id 
    let contact = await Contact.findById(request.params.id);

    // Contacts Route: return an error message if there is no saved contact
    if(!contact) return response.status(400).json( { msg: 'unable to find contact'} );

    // Contacts Route: check if the user's contact does not equal the logged user
    // Note: this if-statement checks if the user is an authorized user to the contact 
    if(contact.user.toString() !== request.user.id) {
      return response.status(400).json( { msg: 'unauthorized user is unable to edit contacts'} );
    }

    // Contacts Route: find contact / update contact via method findByIdAndUpdate()
    contact = await Contact.findByIdAndUpdate(request.params.id,
        { $set: contactFields },
        { new: true }
      );

    // Contacts Route: return the updated contact to the app via response object / json format
    response.json(contact);

  } catch(error) {
    console.error(error.message);
    response.status(500).send('unable to update contact');
  }
});

// Route Notes: 
// @route -- DELETE -- api/contacts/:id
// @description -- delete a single contact
// @access -- private

// Contacts Route: create a DELETE request from the new router object
// Contacts Route: authenticate the DELETE request with parameter 'auth' (middleware)
router.delete('/:id', auth, async (request, response) => {
  // Contacts Route: check if the request to delete a saved contact reaches the database
  try {
    // Contacts Route: find the selected contact in the database via method findById()
    // Note: access the parameter of the selected contact via 'request.params.id,' as the request's '/:id' is the contact id 
    let contact = await Contact.findById(request.params.id);

    // Contacts Route: return an error message if there is no saved contact
    if(!contact) return response.status(404).json({ msg: 'unable to find the contact' });

    // Contacts Route: check if user's contact does not equal the authorized user
    if(contact.user.toString() !== request.user.id){
      return response.status(401).json( { msg: 'unauthorized user is unable to edit contact' } );
    }

    // Contacts Route: find contact / remove contact via method findByIdAndRemove()
    // Note: no variable necessary, as there is no stored data in the variable
    await Contact.findByIdAndRemove(request.params.id);

    // Contacts Route: return message via response object / json format
    response.json( { msg: 'contact has been removed' } );

  } catch(error) {
    console.error(error.message);
    response.status(500).send('unable to remove contact');
  }
});

// Contacts Route: export route 'contacts'
module.exports = router;