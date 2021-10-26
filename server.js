// Server is the basic express server for the project application

// Express Server: initialize object express
// Note: method require() loads and caches JS modules into a Node.JS application
const express = require('express');

// Express Server: initialize object express as variable 'app'
const app = express();

// Express Server: create a GET request into Postman
app.get('/', (request, response) => {
  // Express Server: submit a JS object to the server
  response.json({ msg: 'Welcome to the Contact Keeper API' })
});

// Express Server: define routes 'users,' 'auth,' and 'contacts' in file server.js via method use(), which indicates that all HTTP requests to '/api/users' will be forwarded to the project's routes folder via '/routes/users' and etc. 
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Express Server: variable 'PORT' equals a production port or deployment port
// Note: property 'process.env' is used to access environmental variables in Node.js 
const PORT = process.env.PORT || 5000;

// Express Server: insert method listen() to target a specified from object 'app'
// Note: method listen() can take a callback function (optional) besides port destination
app.listen(PORT, () => {
  // Express Server: insert a console.log to update developer on port type
  console.log(`server started on port ${PORT}`);
});

// Routing Notes:
// * Routing refers to how an application’s endpoints (URIs) respond to client requests
// * Explanation: define routing using methods of the Express app object that correspond to HTTP methods; for example, app.get() to handle GET requests and app.post to handle POST requests
// Routing Callbacks: these routing methods specify a callback function (sometimes called “handler functions”) called when the application receives a request to the specified route (endpoint) and HTTP method. The application “listens” for requests that match the specified route(s) and method(s), and when it detects a match, it calls the specified callback function.

// HTTP Request Notes:
// * GET Request: fetch data from the server
// * POST Request: submit data to the server
// * PUT Request: update data on the server
// * DELETE Request: delete data on the server