// Users is a route for registering a new user

// Users Route: add express server to file users.js (to obtain the router object)
const express = require('express');

// Users Route: variable 'router' equals a new router object
const router = express.Router();

// Route Notes: 
// @route -- POST -- api/users
// @description -- registers a new user
// @access -- public

// Users Route: create a POST request from the new router object
router.post('/', (request, response) => {
  response.send('registers a new user');
});

// Users Route: export route 'users'
module.exports = router;