/* eslint-disable import/no-mutable-exports */ // temp

import React from 'react';
import {
  Field,
  reduxForm,
}
  from 'redux-form';

let ContactForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <Field name="email" component="input" type="email" />
      <Field name="password" component="input" type="password" />
      <button type="submit">
        Log in
      </button>
    </form>
  );
};

ContactForm = reduxForm({
  form: 'contact',
})(ContactForm);

export default ContactForm;
