import axios from "axios";
import jwt_decode from "jwt-decode";
import { AsyncStorage } from 'react-native';
import setAuthToken from "./setAuthToken";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// // register hospitals

export const registerHospital = (hospitalData, history) => dispatch => {
  axios
    .post("v1/hospital", hospitalData)
    .then(res => history.push("/Login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// register labs

export const registerLab = (labData, history) => dispatch => {
  axios
    .post("v1/lab", labData)
    .then(res => history.push("/Login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// register users / doctors

export const registerUser = (user, history) => dispatch => {
  axios
    .post("http://192.168.1.5:3001/v1/users", user)
    .then(res => {
      history.push("/Login");
      console.log(res.data);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// login all users and set jwt token and user data in local storage and turn isAuthanticated to true

export const loginUser = user => dispatch => {
  axios
    .post("http://192.168.1.5:3001/v1/auth/login", user)
    .then(res => {
      let token = res.data;
      token = JSON.stringify(token);

      AsyncStorage.setItem('jwtToken', token)
      //console.log(token);
      // localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decode = jwt_decode(token);
      dispatch(setCurrentUser(decode));
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// logout all users and set local storage empty and turn isAuthanticated to false

export const logoutUser = history => dispatch => {
  // remove token from local storage
  localStorage.removeItem("jwtToken");
  //remove auth header for future requests
  setAuthToken(false);
  //set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  history.push("/");
};
