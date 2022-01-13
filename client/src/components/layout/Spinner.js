// Spinner is a file for creating the loading spinner in the project application

import React, { Fragment } from 'react'
import spinner from './spinner.gif';

export default () => (
  <Fragment>
    <img 
      src={spinner}
      style={{ width: "200px", margin: "auto", display: "block" }}
      alt="Loading" 
    />
  </Fragment>
);