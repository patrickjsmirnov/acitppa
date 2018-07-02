import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';
import store from '../../store';
import {
  logged,
  setLoadingData,
}
  from '../../actions';
import Preloader from '../Preloader';
import './style.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      grecaptcha: '',
    };
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token) {
      store.dispatch(logged(true));
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    store.dispatch(setLoadingData(true));
    this.recaptchaInstance.reset(); // should be removed in production
    this.recaptchaInstance.execute();
  }

  hundleInputChange = (field, e) => {
    if (field === 'email') {
      this.setState({ email: e.target.value });
      return;
    }
    this.setState({ password: e.target.value });
  }

  verifyCallback = (grecaptchaResponse) => {
    if (grecaptchaResponse) {
      this.setState({ grecaptcha: grecaptchaResponse });

      const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
        },
        body: JSON.stringify(this.state),
      };

      const requestUrl = 'https://passport.apptica.com/login';

      fetch(requestUrl, requestOptions)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response.json());
          }
          const error = new Error(response.statusText || response.status);
          return Promise.reject(error);
        })
        .then((data) => {
          store.dispatch(logged(true));
          store.dispatch(setLoadingData(false));
          localStorage.setItem('token', data); // should be inserted real token from data
        })
        .catch((error) => {
          store.dispatch(setLoadingData(false));
          console.log(error);
        });
    }
  }

  render() {
    const { isLogged } = store.getState();
    const { email, password } = this.state;
    const loginNotification = (
      <div className="login-notification">
        You are logged in
      </div>
    );

    return (
      <div>
        <Preloader />
        { /* <LoginStatus isLogged={isLogged} loadingData={loadingData} /> */}

        <Recaptcha
          ref={(e) => { this.recaptchaInstance = e; }}
          sitekey="6Ld_xSAUAAAAAI_L7ycY9w7XB135By2YOmX8m4du" // this sitekey is from apptica.com
          size="invisible"
          verifyCallback={this.verifyCallback}
        />

        { isLogged && loginNotification }


        { !isLogged && (
          <form className="login-form" onSubmit={this.handleSubmit}>
            <input className="login-input" type="email" value={email} onChange={e => this.hundleInputChange('email', e)} placeholder="Email" />
            <input className="login-input" type="password" value={password} onChange={e => this.hundleInputChange('password', e)} placeholder="Password" />
            <input className="login-btn" type="submit" value="Log in" />
          </form>
        )
        }

      </div>
    );
  }
}

export default Login;
