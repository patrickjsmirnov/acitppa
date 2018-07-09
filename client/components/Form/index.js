/* eslint-disable import/no-mutable-exports */ // temp

import React from 'react';
import {
  Field,
  reduxForm,
}
  from 'redux-form';
import './style.css';

let ContactForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label htmlFor="email">
        <span className="input-label">
          Email:
        </span>
        <Field className="login-input" name="email" component="input" type="email" />
      </label>
      <label htmlFor="password">
        <span className="input-label">
          Password:
        </span>
        <Field className="login-input" name="password" component="input" type="password" />
      </label>
      <button className="login-btn" type="submit">
        Log in
      </button>
    </form>
  );
};

ContactForm = reduxForm({
  form: 'contact',
})(ContactForm);

export default ContactForm;
