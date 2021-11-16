// App is the root component housing all of the other separate components to create the UI of the project application
import React, {Fragment} from 'react';
// App Component: import router, route, and switch from react router
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About'

import ContactState from './context/contact/ContactState';
import './App.css';

const App = () => {
  return (
    // App Component: insert <ContactState> component to the first-level of the UI as the component inherits the value from the context provider in file ContactState.js
    <ContactState>
      {/* // App Component: return <Router> as the first level of the App UI hierarchy */}
      {/* Notes: <Router> enables access to <Routes> and <Route> */}
      <Router>
        <Fragment>
          <Navbar/>
          <div className="container">
            {/* App Component: insert <Routes> and <Route> elements for the home / about pages */}
            {/* Note: React Router v6 upgrade replaces <Switch> with <Routes> */}
            {/* Notes: React Router v6 upgrade replaces component={Home} with element={<Home/>} */}
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/about" element={<About/>} />
            </Routes>
          </div>
        </Fragment>
      </Router>
    </ContactState>
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