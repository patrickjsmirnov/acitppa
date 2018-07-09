import React from 'react';
import { connect } from 'react-redux';
import './style.css';


const mapStateToProps = state => ({ isFetching: state.data.isFetching });

const ConnectedPreloader = (state) => {
  console.log('loader');
  console.log(state);
  if (!state.isFetching) {
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
