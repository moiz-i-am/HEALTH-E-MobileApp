import {
  GET_USER_DATA,
  CLEAR_USER_DATA,
  UPDATE_USER_DATA
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        user: action.payload.user
      };
    case CLEAR_USER_DATA:
      return {
        ...state,
        user: action.payload.user
      };
    case UPDATE_USER_DATA:
      return {
        ...state,
        user: action.payload.user
      };
    default:
      return state;
  }
}
