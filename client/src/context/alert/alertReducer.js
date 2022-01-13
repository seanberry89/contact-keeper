// AlertReducer is one of three management files for react applications; the file takes two arguments, the current state and the action, and returns a new state

// Alert Reducer: import the environmental variable for changing state in the reducer
import {
  SET_ALERT,
  REMOVE_ALERT
} from '../types';

// Alert Reducer: export default the reducer as an arrow function
// Note: reducer takes two params: current state and action
export default (state, action) => {
  // Alert Reducer: execute one of multiple listed actions via switch statement
  // Note: switch statements select one of multiple code blocks to be executed
  // Note: switch statements run cases if there is an action match or default if no match
  switch(action.type) {
    case SET_ALERT:
      // Note: action SET_ALERT returns an array, as there was no state but an empty array as the initial value
      return [...state, action.payload]

    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload)

    default:
      return state;
  }
}