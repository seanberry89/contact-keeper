// setAuthToken is a utility file to set the access token into the default header
// Note: Axios is a promise-based HTTP client that allows requests to a given endpoint

// Set Token: import module 'axios' from axios
import axios from 'axios';

// Set Token: create arrow function 'setAuthToken' to set token into default header
// Note: 'setAuthToken' takes in the token as the parameter
const setAuthToken = (token) => {
  // Set Token: check if there is an authentication token via if statement
  if(token) {
    // Set Token: if yes, enable axios default header, with key 'x-auth-token,' to be 'token'
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    // Set Token: if no, remove axios default header with key 'x-auth-token'
    delete axios.defaults.headers.common['x-auth-token'];
  }
}

export default setAuthToken;