import { LOGGED, SET_EMAIL, SET_PASSWORD, SET_GRECAPTCHA } from "../constants/action-types";

export const logged = (isLogged) => ({
    type: LOGGED, 
    isLogged
});

export const setEmail = (email) => ({
    type: SET_EMAIL, 
    email
});

export const setPassword = (password) => ({
    type: SET_PASSWORD, 
    password
});

export const setGrecaptcha = (grecaptcha) => ({
    type: SET_GRECAPTCHA, 
    grecaptcha
});
