import React from 'react';
import { connect } from 'react-redux';
import './style.css';


const mapStateToProps = state => ({ loadingData: state.data.loadingData });

const ConnectedPreloader = (state) => {
  console.log('loader');
  if (!state.loadingData) {
    return (
      <div />
    );
  }
  return (
    <div className="preloader" />
  );
};

const Preloader = connect(mapStateToProps)(ConnectedPreloader);

export default Preloader;
