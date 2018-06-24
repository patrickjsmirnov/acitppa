import { LOGGED } from "../constants/action-types";
import { SET_TOKEN, SET_EMAIL, SET_PASSWORD, SET_GRECAPTCHA } from "../constants/action-types";


const initialState = {
  isLogged: false,
  email: '',
  password: '',
  grecaptcha: ''
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
    default:
        return state;
  }
};


export default rootReducer;