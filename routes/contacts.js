// Contacts is a basic CRUD (create, read, update, delete) route to the backend of the project application (express server)

// Contacts Route: add express server to file contacts.js (to obtain the router object)
const express = require('express');

// Contacts Route: variable 'router' equals a new router object
const router = express.Router();

// Route Notes: 
// @route -- GET -- api/contacts
// @description -- retrieve all user contacts
// @access -- private

// Contacts Route: create a GET request from the new router object
router.get('/', (request, response) => {
  response.send('retrieve all user contacts');
});

// Route Notes: 
// @route -- POST -- api/contacts
// @description -- add new contact(s)
// @access -- private

// Contacts Route: create a POST request from the new router object
router.post('/', (request, response) => {
  response.send('add new contact(s)');
});

// Route Notes: 
// @route -- PUT -- api/contacts/:id
// @description -- update a single contact
// @access -- private

// Contacts Route: create a PUT request from the new router object
router.put('/:id', (request, response) => {
  response.send('update a single contact');
});

// Route Notes: 
// @route -- DELETE -- api/contacts/:id
// @description -- delete a single contact
// @access -- private

// Contacts Route: create a DELETE request from the new router object
router.delete('/:id', (request, response) => {
  response.send('delete a single contact');
});

// Contacts Route: export route 'contacts'
module.exports = router;