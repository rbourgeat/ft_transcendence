import React from 'react';
import './Auth.scss';

import Header from "../Header/Header";
import Login from "./Login/Login"
import Signup from "./Signup/Signup"
import FourtyTwo from "./42Auth/42Auth";

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
                <div className="row d-flex justify-content-center text-center">
                    <div id="auth-form-div" className="col-8">
                        <div id="auth--form1" >
                            <div id="form--auth1" className="forms">
                                <h2>Bienvenue ! </h2>
                                <p>Pour jouer, vous devez vous authentifier 🏓 </p>
                                <FourtyTwo />
                                <Signup />
                        </div>
                            <Login />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
