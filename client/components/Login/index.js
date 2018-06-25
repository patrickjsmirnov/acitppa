import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';
import { connect } from "react-redux";
import store from "../../store";
import { logged, setToken, setEmail, setPassword, setGrecaptcha, setLoadingData } from "../../actions";
import Preloader from '../Preloader';
import LoginStatus from '../LoginStatus';
import './style.css';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            grecaptcha: ''
        }

        this.recaptchaInstance;
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
            this.setState({email: e.target.value});
            return;
        }
        this.setState({password: e.target.value})
    }

    verifyCallback = (response) => {
        if (response) {

            this.setState({grecaptcha: response})

            const requestOptions = {
                method: 'POST', 
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            }

            const requestUrl = 'https://passport.apptica.com/login';
             
            fetch(requestUrl, requestOptions)
                .then(response => {
                    if (response.status >= 200 && response.status < 300) {
                        return Promise.resolve(response.json())
                    }
                    else {
                        const error = new Error(response.statusText || response.status);
                        return Promise.reject(error);
                    }
                })
                .then(data => {
                    store.dispatch(isLogged(true));
                    store.dispatch(setLoadingData(false));
                    localStorage.setItem('token', 'token from data'); // should be inserted real token from data
                    console.log('successful logged');
                })
                .catch(error => {
                    store.dispatch(setLoadingData(false));
                    console.log(error)
                })
            
        }
        
    };

    render() {
        const isLogged = store.getState().isLogged;
        const loadingData = store.getState().loadingData;

        return (
            <div>

                <Preloader />

                { /* <LoginStatus isLogged={isLogged} loadingData={loadingData} /> */} {/* not working yet */}

                <Recaptcha
                    ref={e => this.recaptchaInstance = e}
                    sitekey="6Ld_xSAUAAAAAI_L7ycY9w7XB135By2YOmX8m4du" // this sitekey is from apptica.com
                    size="invisible"
                    verifyCallback={this.verifyCallback}
                />

                { isLogged && <div className="login-notification">You are logged in</div> }


                { !isLogged &&
                    <form className="login-form" onSubmit={this.handleSubmit}>
                        <input className="login-input" type="email" value={this.state.email} onChange={(e) => this.hundleInputChange('email', e)} placeholder="Email" />
                        <input className="login-input" type="password" value={this.state.password} onChange={(e) => this.hundleInputChange('password', e)} placeholder="Password" />
                        <input className="login-btn" type="submit" value="Log in"/>            
                    </form>
                }

            </div>
        );
    }
}

export default Login;
