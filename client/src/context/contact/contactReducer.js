// ContactReducer is one of three management files for react applications; the file takes two arguments, the current state and the action, and returns a new state

// Contact Reducer: import the environmental variables for updating the state in the reducer
import {
  ADD_CONTACT,
  GET_CONTACTS,
  DELETE_CONTACT,
  CLEAR_CONTACTS,
  CONTACT_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types'

// Contact Reducer: export default the reducer (as an arrow function)
// Note: reducer takes two params: current state and action
export default (state, action) => {
  // Contact Reducer: execute one of multiple listed actions via switch statement
  // Note: switch statements select one of multiple code to be executed at a time
  // Note: rewrite case ADD_CONTACT to sort new contacts to the top: move 'action.payload,' the new contact, to the front of the new value of state 'contacts' 
  switch(action.type){
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        loading: false
      };

    // Contact Reducer: return state 'contacts' with the 'action.payload'
    // Note: 'action.payload' is the requested contacts data from the backend
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false
      }
    
    case UPDATE_CONTACT:
    // Note: method map() returns a new array after looping through each of the items
    // Ternary Operator: if the 'id' of parameter 'contact' is equal to the 'id' of the action's payload then return the payload of the selected contact or else return the same contact
      return {
        ...state,
        contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact),
        loading: false
      };

    case DELETE_CONTACT:
      // Note: from state 'contacts,' method filter() takes the parameter 'contact' and runs an in-line arrow function returning a payload that's NOT the id of the selected contact
      // Note: rewrite property 'id' to match property '_id' assigned in MongoDB
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact._id !== action.payload),
        loading: false
      }

    // Contact Reducer: return all states to default values during logout
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        filtered: null,
        current: null,
        error: null
      }

    case SET_CURRENT:
      // Note: action returns the selected contact, as the "action's payload," to state 'current'  
      return {
        ...state,
        current: action.payload
      }

    case CLEAR_CURRENT:
      // Note: action returns state 'current' to the default value of 'null'
      return {
        ...state,
        current: null
      }

    case FILTER_CONTACTS:
      return {
        ...state,
        // Contact Reducer: return a new array of state 'contacts' via method filter()
        filtered: state.contacts.filter(contact => {
          // Contact Reducer: create a Regular Expression object to match the contact text
          const regex = new RegExp(`${action.payload}`, 'gi');
          // Contact Reducer: return match from contact name or contact email via method match()
          return contact.name.match(regex) || contact.email.match(regex);
        })
      }

    case CLEAR_FILTER:
      // Note: action returns state 'filtered' back to default value of null
      return {
        ...state,
        filtered: null
      }

    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state; 
  }
}