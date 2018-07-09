import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';
import store from '../../store';

import {
  logged,
  setLoadingData,
  setEmail,
  setPassword,
  setGrecaptcha,
  requestToken,
  receiveToken,
  fetchToken,
}
  from '../../actions';
import Preloader from '../Preloader';
import './style.css';
import ContactForm from '../Form';

class Login extends Component {
  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token) {
      store.dispatch(logged(true));
    }
  }

  handleSubmit = (values) => {
    console.log('handleSubmit');
    const { email, password } = values;
    store.dispatch(setEmail(email));
    store.dispatch(setPassword(password));

    this.recaptchaInstance.reset(); // should be removed in production
    this.recaptchaInstance.execute();
  }

  verifyCallback = (grecaptchaResponse) => {
    if (grecaptchaResponse) {
      store.dispatch(setGrecaptcha(grecaptchaResponse));

      const { email, password, grecaptcha } = store.getState().data;
      const requestData = {
        email,
        password,
        grecaptcha,
      };

      const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
        },
        body: JSON.stringify(requestData),
      };

      console.log('fetch will be here');
      const requestUrl = 'https://passport.apptica.com/login';

      store.dispatch(fetchToken(requestUrl, requestOptions));
    }
  }

  render() {

    const loginNotification = (
      <div className="login-notification">
        You are logged in
      </div>
    );

    return (
      <div>
        <Preloader />

        <Recaptcha
          ref={(e) => { this.recaptchaInstance = e; }}
          sitekey="6Ld_xSAUAAAAAI_L7ycY9w7XB135By2YOmX8m4du" // this sitekey is from apptica.com
          size="invisible"
          verifyCallback={this.verifyCallback}
        />

        { isLogged && loginNotification }

        <ContactForm onSubmit={this.handleSubmit} />

      </div>
    );
  }
}

export default Login;
