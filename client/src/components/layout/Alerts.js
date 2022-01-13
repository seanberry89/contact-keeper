// Alerts is a component file for displaying alert messages inside the application homepage

import React, { useContext } from 'react'
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  // Alerts Component: initialize the context object via useContext
  const alertContext = useContext(AlertContext);

  return (
    // Alerts Component: check for alerts in the alert array via Logical AND
    // Logical And: if the length of the alerts array is more than '0' then- 
    // Note: loop through each of the existing alerts via method map() to output a <div> element
    alertContext.alerts.length > 0 && alertContext.alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle" /> {alert.msg}
      </div>
    ))
  )
}

export default Alerts;
