import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import {
  LOGGED,
  SET_LOADING_DATA,
  SET_EMAIL,
  SET_PASSWORD,
  SET_GRECAPTCHA,
}
  from '../constants/action-types';

const initialState = {
  isLogged: false,
  loadingData: false,
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
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  data: mainReducer,
  form: formReducer,
});

export default rootReducer;
