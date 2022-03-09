import React from 'react';
import './Auth.scss';

import Header from "../Header/Header";
import Login from "./Login/Login"
import Signup from "./Signup/Signup"

/**
 * @malatini
 * Page de connexion / register / Auth42.
 * TODO: gérer auth42, remettre en place le système d'afficher/cache les mots de passes
 */
export default function Auth() {

    return (
        <>
            <Header />
            <div className="container" id="auth-container">
                <div id="auth-form-div">
                    <div id="auth--form1" >
                        <div id="form--auth1" className="forms">
                            <h2>Bienvenue ! </h2>
                            <p>Pour jouer, vous devez vous authentifier 🏓 </p>
                            <div id="formAuth42">
                                <button
                                  type="submit"
                                  className="btn btn-dark btn-block"
                                  id="auth-btn-3"
                                  // onClick={routeChange}
                                  >
                                    Authentification 42
                                </button>
                            </div>
                            <Signup />
                    </div>
                        <Login />
                    </div>
                </div>
            </div>
        </>
    );
}
