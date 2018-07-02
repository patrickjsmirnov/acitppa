import {
  LOGGED,
  SET_EMAIL,
  SET_PASSWORD,
  SET_GRECAPTCHA,
  SET_LOADING_DATA,
}
  from '../constants/action-types';

const initialState = {
  isLogged: false,
  loadingData: false,
};


const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED:
      return { ...state, isLogged: action.isLogged };
    case SET_EMAIL:
      return { ...state, email: action.email };
    case SET_PASSWORD:
      return { ...state, password: action.password };
    case SET_GRECAPTCHA:
      return { ...state, grecaptcha: action.grecaptcha };
    case SET_LOADING_DATA:
      return { ...state, loadingData: action.loadingData };
    default:
      return state;
  }
};

export default rootReducer;
