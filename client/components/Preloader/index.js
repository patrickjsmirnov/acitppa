import React, {Component} from 'react';
import { connect } from "react-redux";
import store from "../../store";

import './style.css';

const mapStateToProps = state => {
    return { loadingData: state.loadingData };
};

const ConnectedPreloader = (state) => {
    if (!state.loadingData) {
        return (
            <div></div>
        )
    }
    return (
    <div className="preloader"></div>
  );
}

const Preloader = connect(mapStateToProps)(ConnectedPreloader)

export default Preloader;
