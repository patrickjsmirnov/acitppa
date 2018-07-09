import {
  LOGGED,
  SET_EMAIL,
  SET_PASSWORD,
  SET_GRECAPTCHA,
  SET_LOADING_DATA,
  REQUEST_TOKEN,
  RECEIVE_TOKEN_SUCCESS,
  RECEIVE_TOKEN_FAIL,
}
  from '../constants/action-types';

export const logged = isLogged => ({
  type: LOGGED,
  isLogged,
});

export const setEmail = email => ({
  type: SET_EMAIL,
  email,
});

export const setPassword = password => ({
  type: SET_PASSWORD,
  password,
});

export const setGrecaptcha = grecaptcha => ({
  type: SET_GRECAPTCHA,
  grecaptcha,
});

export const requestToken = isFetching => ({
  type: REQUEST_TOKEN,
  isFetching,
});

export const receiveTokenSuccess = token => ({
  type: RECEIVE_TOKEN_SUCCESS,
  token,
});

export const receiveTokenFail = error => ({
  type: RECEIVE_TOKEN_FAIL,
  error,
});

export const fetchToken = (requestUrl, requestOptions) => (dispatch) => {
  dispatch(requestToken(true));
  return fetch(requestUrl, requestOptions)
    .then(
      response => response.json(),
      (error) => {
        console.log('An error occurred.', error);
        dispatch(receiveTokenFail(error));
      }
    )
    .then(
      (json) => {
        // get toket from response
        const token = '111';
        dispatch(receiveTokenSuccess(token));
      },
    );
}