// alertContext is one of three state management files for the alert messages in the project application; this file initializes the context object via createContext
import { createContext } from "react";

// Alert Context: create a context object via createContext() constructor
// Note: the context object allows the access to the Context.Provider / Context.Consumer
// Note: Context.Provider = the component that provides the value to the sub-components
// Note: Context.Consumer = the component that inherits the value to the sub-components
const alertContext = createContext();

export default alertContext;