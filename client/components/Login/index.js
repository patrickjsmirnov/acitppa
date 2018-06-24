
import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';
import { connect } from "react-redux";
import store from "../../store";
import { logged, setToken, setEmail, setPassword, setGrecaptcha } from "../../actions";

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

            const url = 'https://passport.apptica.com/login';
             
            fetch(url, requestOptions)
                .then((response) => {
                    console.log('response = ', response.json());
                })
                .catch((error) => {
                    console.log('error message = ', error.message);
                })
        }
        
    };

    render() {
        return (
            <div>
                <Recaptcha
                    ref={e => this.recaptchaInstance = e}
                    sitekey="6Ld_xSAUAAAAAI_L7ycY9w7XB135By2YOmX8m4du"
                    size="invisible"
                    verifyCallback={this.verifyCallback}
                />

                { !store.getState().isLogged &&
                    <form onSubmit={this.handleSubmit}>
                        <input type="email" value={this.state.email} onChange={(e) => this.hundleInputChange('email', e)} placeholder="Email" />
                        <input type="password" value={this.state.password} onChange={(e) => this.hundleInputChange('password', e)} placeholder="Password" />
                        <input type="submit" value="Log in"/>            
                    </form>
                }

            </div>
        );
    }
}

export default Login;
