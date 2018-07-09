import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import {
  LOGGED,
  SET_LOADING_DATA,
  SET_EMAIL,
  SET_PASSWORD,
  SET_GRECAPTCHA,
  REQUEST_TOKEN,
  RECEIVE_TOKEN_SUCCESS,
  RECEIVE_TOKEN_FAIL,
}
  from '../constants/action-types';

const initialState = {
  isFetching: false,
  token: '',
  error: '',
  email: '',
  password: '',
  grecaptcha: '',
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED:
      return { ...state, isLogged: action.isLogged };
    case SET_LOADING_DATA:
      return { ...state, loadingData: action.loadingData };
    case SET_EMAIL:
      return { ...state, email: action.email };
    case SET_PASSWORD:
      return { ...state, password: action.password };
    case SET_GRECAPTCHA:
      return { ...state, grecaptcha: action.grecaptcha };
    case REQUEST_TOKEN:
      return { ...state, isFetching: true };
    case RECEIVE_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.token,
        error: '',
        isFetching: false,
      };
    case RECEIVE_TOKEN_FAIL:
      return {
        ...state,
        token: '',
        error: action.error,
        isFetching: false,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  data: mainReducer,
  form: formReducer,
});

export default rootReducer;
