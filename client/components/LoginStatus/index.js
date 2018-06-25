import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';
import { connect } from "react-redux";
import store from "../../store";
import { logged, setToken, setEmail, setPassword, setGrecaptcha, setLoadingData } from "../../actions";
import Preloader from '../Preloader';

class LoginStatus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginFailed: false
        }

        this.isLoggin = props.isLoggin;
        this.loadingData = props.loadingData;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.loadingData && !this.loadingData ) {
            this.setState({loginFailed: true});
        };
    }

    render() {

        const loginFailed = this.state.loginFailed;

        return (
            <div>
                { loginFailed && <div>Попробуйте еще раз</div> }
            </div>
        );
    }
}

export default LoginStatus;
