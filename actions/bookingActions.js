import axios from "axios";
import { GET_USER_DATA, CLEAR_USER_DATA, GET_ERRORS } from "./types";

export const createAppointmentBooking = (bookingData, token) => dispatch => {
  axios
    .post(`http://192.168.1.5:3001/v1/booking`, bookingData, {
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    })
    .then(res => {})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteAppointmentBooking = (deleteData, token) => dispatch => {
  axios
    .post(`http://192.168.1.5:3001/v1/booking/deletebooking`, deleteData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
