import { GET_TIME_DATA } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_TIME_DATA:
      return {
        ...state,
        schedule: action.payload.schedule
      };
    default:
      return state;
  }
}
