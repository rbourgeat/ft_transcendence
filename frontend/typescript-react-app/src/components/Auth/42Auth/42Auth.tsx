import './42Auth.scss';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

interface FourtyTwoProps { }

interface FourtyTwoState {
  email?: string,
  password?: string
}

export default class Login extends React.Component<FourtyTwoProps, FourtyTwoState>
{
  constructor(props: FourtyTwoProps) {
    super(props);

    this.state = {
      email: "",
      password: ""
    }
  }

  fourtytwo = (event: any) => {
    event.preventDefault();
    localStorage.setItem("loggedIn", "true");
    window.top.location = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/42auth/redirect/");
  }

  render() {
    return (
      <div className="row d-flex justify-content-center">
        <button
          type="submit"
          className="btn btn-outline-light"
          id="auth-btn-3"
          onClick={this.fourtytwo}
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/1200px-42_Logo.svg.png" height="20" width="20" />
          Auth
        </button>
      </div>
    );
  }
}
