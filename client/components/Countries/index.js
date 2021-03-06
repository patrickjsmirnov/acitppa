import React, { Component } from 'react';
import { Redirect } from 'react-router';
import store from '../../store';
import { logged } from '../../actions';


class Countries extends Component {
  componentWillMount() {
    const token = localStorage.getItem('token');

    if (token) {
      store.dispatch(logged(true));

      const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const url = 'https://api.apptica.com/v1/geo?platform=1';

      fetch(url, requestOptions)
        .then((response) => {
          console.log('response = ', response);
        })
        .catch(error => console.log(error.message));
    } else {
      store.dispatch(logged(false));
    }
  }

  render() {
    const redirect = store.getState().isLogged ? '' : <Redirect to="/login" />;

    return (
      <div>
        { redirect }
        countries
      </div>
    );
  }
}

export default Countries;
