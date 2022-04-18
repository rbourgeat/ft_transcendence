import './42Auth.scss';
import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
//import ToastAlerts from "../../Utils/ToastAlerts/ToastAlerts"
import myAxios from "../../Utils/Axios/Axios"
import axios from "axios";

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
    //ajout check connexion
    //console.log(localStorage.getItem("2fa"));
    //localStorage.setItem("2faverif", "false");
    //if (localStorage.getItem("2fa") == "false")
    //{
    //  localStorage.setItem("2faverif", "false");
    //}
    window.top.location = "http://localhost:3000/api/42auth/redirect/";

    /*
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.get("http://localhost:3000/api/42auth/redirect/")
        .then(res => {
          console.log("42 redirect");
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
          console.log("Catched error while being redirected to 42auth");
        })
      */
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
