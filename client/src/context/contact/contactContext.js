// contactContext is one of three state management files for react applications; this file initializes the context object via createConnect()

// Context API: import { createContext } from react
import { createContext } from "react";

// Context API: create the context object via createContext()
const contactContext = createContext();

export default contactContext; 

// Context API Notes:
// * the context object is responsible for creating / sharing data inside react applications via Context.Provider and Context.Consumer
// * Context.Provider = the component that provides the value to the sub-components
// * Context.Consumer = the component that inherits the value to the sub-components