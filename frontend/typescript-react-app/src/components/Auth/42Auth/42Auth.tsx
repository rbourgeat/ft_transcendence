import './42Auth.scss';
import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
//import ToastAlerts from "../../Utils/ToastAlerts/ToastAlerts"
import myAxios from "../../Utils/Axios/Axios"

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
    window.top.location = "http://localhost:3000/api/42auth/redirect/";
  }

  render() {
    return (
      <div>
        <div id="formAuth42">
          <button
            type="submit"
            className="btn btn-dark btn-block"
            id="auth-btn-3"
            onClick={this.fourtytwo}
          >
            Authentification 42
          </button>
        </div>
      </div>
    );
  }
}
