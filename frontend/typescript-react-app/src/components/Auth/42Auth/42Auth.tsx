import './42Auth.scss';

import { Redirect, useHistory, Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastAlerts from "../../Utils/ToastAlerts/ToastAlerts"
import myAxios from "../../Utils/Axios/Axios"

interface FourtyTwoProps { }

interface FourtyTwoState {
  email?: string,
  password?: string,
  //isLogged?: boolean
}

/**
 * @malatini
 * Page Auth, permet de vérifier si les infos sont correctes, de connecter le user et d'être redirigé
 * TODO: devrait modifier le useContext pour qu'on puisse afficher les pages/composants si connectes
 */
export default class Login extends React.Component<FourtyTwoProps, FourtyTwoState>
{
  constructor(props: FourtyTwoProps) {
    super(props);
    //Init state
    this.state = {
      email: "",
      password: "",
      //isLogged: false
    }
  }

  //Connexion ou tentative de connection en utilisant notre "utilitaire" myAxios
  fourtytwo = (event: any) => {
    event.preventDefault();
    let ax = new myAxios(
      {
        method: "GET",
        ressource: "/42auth/login",
      })

    let res = ax.fourtytwoauth();
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
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

        </div>
      </div>
    );
  }
}
