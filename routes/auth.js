// Auth is a route for getting/authenticating a past user

// Auth Route: add express server to file auth.js (to obtain the router object)
const express = require('express');

// Auth Route: variable 'router' equals a new router object
const router = express.Router();

// Route Notes: 
// @route -- GET -- api/auth
// @description -- retrieve a logged user
// @access -- private

// Auth Route: create a GET request from the new router object
router.get('/', (request, response) => {
  response.send('retrieve a logged user');
});

// Route Notes: 
// @route -- POST -- api/auth
// @description -- authenticate user and token
// @access -- pubic

// Auth Route: create a POST request from the new router object
router.post('/', (request, response) => {
  response.send('login user');
});

// Auth Route: export route 'auth'
module.exports = router;