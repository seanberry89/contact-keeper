// Users is the route for registering a new user via backend of the application (express routing)

// Users Route: include express server to file users.js (to obtain the router object)
const express = require('express');

// Users Route: variable 'router' equals a new router object
const router = express.Router();

// Users Route: include module 'config' to route users
const config = require('config'); 

// Users Route: include module 'bcrypt' to file users.js
// Note: 'bcrypt' is a password-hashing function installed via NPM
const bcrypt = require('bcryptjs');

// Users Route: include module 'jsonwebtoken' to route users
const jwt = require('jsonwebtoken');

// Users Route: include module 'express-validator' to route users via method require()
// Note: insert 'check' as the parameter to use method check() in the POST request
const { check, validationResult } = require('express-validator');

// Users Route: include the User model to file users.js via method require()
// Note: method require() is used to include modules that exist in separate files
const User = require('../models/User');

// Route Notes: 
// @route -- POST -- api/users
// @description -- registers a new user
// @access -- public

// Users Route: create a POST request from the new router object (login page)
// Users Route (edit): add validation as a new parameter to the POST request
// Note: the 'request.body' object allows you to access data in a string or JSON object
router.post('/', [
  // Users Route: validate user name via parameter: field name and error message
  check('name', 'please enter a valid username').not().isEmpty(),
  // Users Route: validate user email via parameter: field email and error message
  check('email', 'please enter a valid email').isEmail(),
  // Users Route: validate user password via parameter: field password and error message
  check('password', 'please enter a password of six or more characters').isLength({ min: 6 })
], async (request, response) => {
 
  // Users Route: variable 'errors' equals method validationResult()
  // Note: method validationResult() takes in a parameter of 'request'
  // Note: the method extracts the validation errors from a request and makes them available in a 'Result' object
  const errors = validationResult(request);
  
  // Users Route: check if there validation errors via if-statement
  // If Statement: if NOT errors is empty, meaning, if there are empty fields then-
  if(!errors.isEmpty()) {
    
    // Users Route: return status 400 and error data in a JSON object w/ property 'errors'
    // Note: method status() sends a specific status such as "400"
    // Note: method array() converts the error data as an array
    return response.status(400).json({ errors: errors.array() });
  }

  // Users Route: de-structure properties 'name,' 'email,' and 'password' from 'request.body'
  const { name, email, password } = request.body;

  // Users Route: check if the submission of a new user reaches the database via try/catch
  try {
    // Users Route: variable 'user' equals a previous user in the User model via method findOne()
    // Note: method findOne() takes a parameter of 'email,' which is the search of a duplicate email inside the User model
    let user = await User.findOne( { email } );

    // Users Route: check if there is a previous user in the User model
    if(user) {
      // Users Route: return error status and error message
      return response.status(400).json({ msg: 'this user exists already'});
    }

    // Users Route: if no previous user, then 'user' equals new user object
    user = new User({
      name,
      email,
      password
    });

    // Users Route: create salt value '10' rounds for hashed password via method genSalt()
    const salt = await bcrypt.genSalt(10);

    // Users Route: hash the new user password via method hash()
    user.password = await bcrypt.hash(password, salt);

    // Users Route: create object 'payload' with the new user data
    // Note: payload is a parameter when creating the user token
    const payload = {
      // Users Route: store the user's id inside of the registered new user or 'user'
      user: {
        id: user.id
      }
    };

    // Users Route: generate a new web token via method sign()
    // Note: method sign() takes four parameters: payload, secret key / private key, {options}, and (callback) | submit an 'error' or 'token' if callback is inserted as a parameter (which is for asynchronous functions)
    jwt.sign(payload, config.get('jwtSecret'), {
      // Users Route: set an expiration of the token as an option
      expiresIn: 360000
    }, (error, token) => {
      // Users Route: check if there is an error with generating a new token
      if(error) throw error;
      // Users Route: submit the new token through route users in a JSON object
      response.json({ token });
    });

  } catch (error) {
    // Users Route: 
    console.log(error.message);
    response.status(500).send('server error');
  }
});

// Users Route: export route 'users'
module.exports = router;

// HTTP Callback Notes:
// * HTTP is a request-response protocol where each operation consists of a request-response pair: (1) a request message sent from the client to a server followed by (2) a response message returned from the server to the client 
// * GET request : to request data from the server
// * POST request : to submit data to be processed to the server

// Configuration Manager Module Notes:
// * Definintion: it's responsible for managing the collection of admin settings that determine how the site functions, as opposed to the content of the site.
// * include configuration files: const config = require('config')

// JSOB Web Token Notes:
// * Definition: JWT is a proposed "internet standard" for creating data with optional signature and/or optional encryption whose payload holds JSON that asserts some number of claims. The tokens are signed either using a private secret or a public/private key.