// Auth is the middleware function file for verifying the web token a saved user 

// Auth Middleware: include module 'jsonwebtoken' to verify user's web token
const jwt = require('jsonwebtoken');

// Auth Middleware: include module 'config' to access the token secret
const config = require('config');

// Auth Middleware: export middleware function w/ parameters: 'request,' 'response,' and 'next'
// Note: middleware functions require parameter 'next' to move onto the next middleware function (if applicable)
module.exports = (request, response, next) => {
  // Auth Middleware: retrieve user's web token from header 'x-access-token'
  const token = request.header('x-auth-token');

  // Auth Middleware: check if there is NO token
  if(!token){
    return response.status(401).json( { msg: 'token does not exist, authorization denied'} );
  }

  // Auth Middleware: check if THERE IS a token
  try {
    // Auth Middleware: verify if the user's token exists via method verify()
    // Note: method verify() takes in two parameters: user's token and token secret
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Auth Middleware: set the user from token payload 'decoded' to the request object
    request.user = decoded.user;

    // Auth Middleware: call method next() to move onto the next middleware function
    next()
  } catch(error) {
    // Auth Middleware: return error response / error message if unable to retrieve token
    response.status(401).json({ msg: 'token is not valid'});
  }
}
