import React, { Component } from 'react';

class LoginStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginFailed: false,
    };
  }

  render() {
    const { loginFailed } = this.state;
    return (
      <div>
        { loginFailed && (
          <div>
            Попробуйте еще раз
          </div>
        )}
      </div>
    );
  }
}

export default LoginStatus;
