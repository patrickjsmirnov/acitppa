import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';

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

    handleSubmit = (e) => {
        e.preventDefault();
        this.recaptchaInstance.execute();
        console.log('handleSubmit');
    }

    hundleInputChange = (field, e) => {
        if (field === 'email') {
            this.setState({
                email: e.target.value
            });
            return;
        }
        this.setState({
            password: e.target.value
        });
    }

    verifyCallback = (response) => {
        console.log('verifycallback');
        if (response) {
            
            console.log('response = ', response);

            this.setState({
                grecaptcha: response
            });

            const requestOptions = {
                method: 'POST', 
                mode: 'cors',
                headers: {
                    'Accept': 'application/json'
                },
                credentials: 'omit',
                body: JSON.stringify(this.state)
            }
         
            console.log('json send = ', requestOptions.body);
    
            fetch('https://passport.apptica.com/login', requestOptions)
                .then((response) => {
                    console.log('response status = ', response.status);
                })
                .catch((error) => {
                    console.log(error.message);
                })
        }
        
    };

    render() {
        return (
            <div>
                <Recaptcha
                    ref={e => this.recaptchaInstance = e}
                    sitekey="6LdvTmAUAAAAACV_4T84JIBrM4ZbcPDMVna3zDDk"
                    size="invisible"
                    verifyCallback={this.verifyCallback}
                />
                <form onSubmit={this.handleSubmit}>
                    <input type="email" value={this.state.email} onChange={(e) => this.hundleInputChange('email', e)} placeholder="Email" />
                    <input type="password" value={this.state.password} onChange={(e) => this.hundleInputChange('password', e)} placeholder="Password" />
                    <input type="submit" value="Log in"/>            
                </form>
            </div>
        );
    }
}

export default Login;
