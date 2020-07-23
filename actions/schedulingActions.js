import axios from 'axios'
import { GET_TIME_DATA, GET_ERRORS } from './types'

export const getDoctorTimeSlots = (docData) => {
  const request = axios.post(
    `http://192.168.1.67:3001/v1/scheduling/timeslots`,
    docData
  )
  return (dispatch) => {
    request.then(({ data }) => {
      let schedule = data
      console.log(schedule)
      let response = {
        schedule,
      }

      dispatch({
        type: GET_TIME_DATA,
        payload: response,
      })
    })
  }
}
