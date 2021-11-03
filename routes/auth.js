// Auth (or authentication) is a route for getting/authenticating a past user via the backend of the project application (express server)

// Auth Route: add express server to file auth.js (to obtain the router object)
const express = require('express');

// Auth Route: variable 'router' equals a new router object
const router = express.Router();

// Auth Route: include module 'config' to route users
// Note: 'config' is the access to the configuration files via NPM
const config = require('config'); 

// Auth Route: include module 'bcrypt' to file users.js
// Note: 'bcrypt' is a password-hashing function installed via NPM
const bcrypt = require('bcryptjs');

// Auth Route: include module 'jsonwebtoken' to route users
// Note: 'jsonwebtoken' is a secure transmission function installed via NPM
const jwt = require('jsonwebtoken');

// Auth Route: include module 'express-validator' to route users via method require()
// Note: insert 'check' as the parameter to use method check() in the POST request
const { check, validationResult } = require('express-validator');

// Auth Route: include the User model to file users.js via method require()
// Note: method require() is used to include modules that exist in separate files
const User = require('../models/User');

// Route Notes: 
// @route -- GET -- api/auth
// @description -- retrieve a logged user
// @access -- private

// Auth Route: create a GET request for route 'auth'
router.get('/', (request, response) => {
  response.send('retrieve a logged user');
});

// Route Notes: 
// @route -- POST -- api/auth
// @description -- authenticate user and token
// @access -- pubic

// Auth Route: create a POST request for route 'auth'
// Auth Route: add validation as a new parameter 
router.post('/', [
  // Auth Route: validate user email via parameter: field email and error message
  check('email', 'please enter a valid email').isEmail(),
  // Auth Route: validate user password via parameter: field password and error message
  // Note: method exists() returns a boolean value (true/false) based on the existence of the property
  check('password', 'please enter a valid password').exists()
  // Auth Route: add 'async' so the callback function is asynchronous
], async (request, response) => {
  // Auth Route: check for request errors via method validationResult()
  // Note: method validationResult() extracts the validation errors from a request and makes them available in object 'Result' | takes a parameter of 'request'
  const errors = validationResult(request);
  
  // Auth Route: check if the validation is an empty request via if-statement
  // Note: if NOT variable 'errors' is empty, meaning empty fields, then--
  if(!errors.isEmpty()){
    // Auth Route: return status 400 and JSON data of an object w/ property 'errors' 
    return response.status(400).json( { errors: errors.array()} );
  }

  // Auth Route: de-structure properties of 'email' and 'password' from 'request.body'
  const { email, password } = request.body;

  // Auth Route: check the validation of a past user in the database via try/catch
  // Note: the 'try statement' will check for errors while a block of code is executed 
  // Note: the 'catch statement' will execute a block of code if an error is found
  try {
    // Auth Route: variable 'user' equals a previous email in the User model via method findOne()
    // Note: method findOne() takes in the parameter of the data used to find a specified user, so insert an object w/ property 'email' and value 'email'
    // Note: method findOne() returns a promise so insert 'await' beforehand 
    let user = await User.findOne( { email } );

    // Auth Route: check if there is NOT a previous user
    if(!user){
      // Auth Route: return error status and error message if there is NOT a previous user
      return response.status(400).json({ msg: 'invalid login credentials'});
    }

    // Auth Route: confirm password by checking if there is a previous user in User model
    // Note: method compare() takes two parameters: text inserted into field 'password,' which is property 'password,' and the hashed password of a past user in the User model
    const isMatch = await bcrypt.compare(password, user.password);

    // Auth Route: check if there is a password match in User model
    if(!isMatch){
      return response.status(400).json({ msg: 'invalid password' });
    }

    // Auth Route: if match, create object 'payload' to be inserted inside the user's web token
    const payload = {
      // Auth Route: store the user's id inside of the object 'payload' via User model
      user: {
        id: user.id
      }
    };

    // Auth Route: generate a web token via method sign()
    // Note: method sign() takes four parameters: payload, secret / private key, {options}, and (callback)
    // Note: submit an 'error' or 'token' if a callback is inserted as a parameter (async)
    jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 360000
    }, (error, token) => {
      // Auth Route: check if there is an error with generating the new token
      if(error) throw error;
      // Auth Route: submit the new token as a JSON object
      response.json({token});
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).send('server error');
  }
});

// Auth Route: export route 'auth'
module.exports = router;