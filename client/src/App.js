// App is the root component housing all of the other separate components to create the UI of the project application
import React, {Fragment} from 'react';
// App Component: import router, route, and switch from react router
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';

import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import './App.css';

// App Component: import route file to secure/redirect to the homepage
import PrivateRoute from './components/routing/PrivateRoute';

// App Component: import utility file setAuthToken to access the set token into the default header
import setAuthToken from './utils/setAuthToken';

// App Component: check if there is a token in local storage via if statement
if(localStorage.token) {
  // App Component: if so, call method setAuthToken to set the token into the default header
  // Note: method setAuthToken() takes in the parameter 'localStorage.token,' which is the token in LS
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    // App Component: insert <AuthState> component as the first-level of the UI instead of <ContactState>
    <AuthState>
      {/* // App Component: insert <ContactState> component to the first-level of the UI as the component inherits the value from the context provider in file ContactState.js */}
      <ContactState>
        <AlertState>
          {/* // App Component: return <Router> as the first level of the App UI hierarchy */}
          {/* Notes: <Router> enables access to <Routes> and <Route> */}
          <Router>
            <Fragment>
              <Navbar/>
              <div className="container">
                <Alerts />
                {/* App Component: insert <Routes> and <Route> elements for the home / about pages */}
                {/* Note: React Router v6 upgrade replaces <Switch> with <Routes> */}
                {/* Notes: React Router v6 upgrade replaces component={Home} with element={<Home/>} */}
                <Routes>
                  <Route exact path="/" element={<PrivateRoute><Home/></PrivateRoute>} />
                  <Route exact path="/about" element={<About/>} />
                  <Route exact path="/register" element={<Register/>} />
                  <Route exact path="/login" element={<Login/>} />
                </Routes>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;


// React Router Notes:
// * <Route></Route> is responsible for rendering a children component's UI when its path matches the route's URL (Example: <Route exact path="/"><Home/></Route>)

// React Matchers Notes: 
// * There are two route matching components: Switch and Route. 
// * When a <Switch> is rendered, it searches through its children <Route> elements to find one whose path matches the current URL. When it finds one, it renders that <Route> and ignores all others. This means that you should put <Route>s with more specific (typically longer) paths before less-specific ones. If no <Route> matches, the <Switch> renders nothing (null).
// * Version 6 Reference: https://reactrouter.com/docs/en/v6/upgrading/v5#upgrade-all-switch-elements-to-routes 
// * Version 6 Upgrade: replaces <Switch> with <Routes>
// * Version 6 Upgrade: replaces component={Home} with element={<Home/>}