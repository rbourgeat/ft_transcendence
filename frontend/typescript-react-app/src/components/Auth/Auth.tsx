import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Auth.scss';
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// import useWindowSize from 'react-use/lib/useWindowSize'
// import Confetti from 'react-confetti'
// import { trustedTypes } from 'trusted-types';

export default function Auth() {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/dashboard`;
        navigate(path);
    };

    const [showPass, setshowPass] = useState(false);
    const [showPassConfirm, setshowPassConfirm] = useState(false);
    const [showPassBis, setshowPassBis] = useState(false);

    //Confetti
    // const { width, height } = useWindowSize();

    console.log(showPass);
    return (
        <>
            {/* <Confetti
                width={width}
                height={height}
            /> */}
            <Header />
            <div className="container" id="auth-container">
                <div id="auth-form-div">
                    <div id="auth--form1"/*className="d-flex justify-content-center"*/ >
                        <div id="form--auth1" className="forms">
                            <h2>Bienvenue ! </h2>
                            <p>Pour jouer, vous devez vous authentifier 🏓</p>
                            <div /*className="form__mb-3"*/ id="formAuth42">
                                <button type="submit" className="btn btn-dark btn-block" id="auth-btn-3" onClick={routeChange}>Authentification 42</button>
                            </div>
                            <h3 id="se-connecter">Se connecter</h3>
                            <div /*className="form__mb-3"*/ id="formBasicEmail">
                                <label>Username</label>
                                <input className="form-control" type="username" placeholder="malatini" /*required */ />
                            </div>

                            <div /*className="form__mb-3"*/ id="formBasicPassword">
                                <label>Mot de passe</label>
                                <input className="form-control" type={showPassBis ? "text" : "password"} placeholder="********" /*required*/ />
                                <div /*className="mt-2"*/ style={{ textAlign: "right" }} id="show-password">
                                    <button type="button" className="btn btn-sm btn-light" onClick={() => {
                                        if (showPassBis == true)
                                            setshowPassBis(false);
                                        else
                                            setshowPassBis(true);
                                    }}>
                                        {showPass ? "Cacher" : "Afficher"}
                                    </button>
                                </div>
                            </div>
                            <p id="connect-p"></p>
                            {/* onClick={routeChange}  */}
                            <hr className="my-4" id="me-connecter_hr"></hr>
                            <div /*className="form__mb-3"*/ id="formBasicConnexion">
                                <button type="submit" className="btn btn-light btn-block" id="auth-btn-1" onClick={routeChange}>Me connecter</button>
                            </div>
                            {/* onClick={routeChange} */}
                    </div>
                    <div id="auth--form2"/*className="d-flex justify-content-center"*/></div>
                        <div className="forms" id="form--auth2">
                            <h3 id="sinscrire">S'inscrire</h3>
                            <div /*className="form__mb-3"*/ id="formSignupUsername">
                                <label>Username</label>
                                <input className="form-control" type="username" placeholder="malatini" /*required*/ />
                            </div>

                            <div /*className="form__mb-3"*/ id="formSignUpEmail">
                                <label>Email</label>
                                <input className="form-control" type="email" placeholder="malatini@student.42.fr" /*required*/ />
                            </div>
                            <div id="password-form">
                                {/* Pour ajouter des regles sur le password : https://developer.mozilla.org/fr/docs/Web/HTML/Element/Input/password */}
                                <div id="sub-form">
                                    <div>
                                        <form>
                                            <div>
                                                <label>Mot de passe</label>
                                                <input className="form-control" type={showPass ? "text" : "password"} placeholder="********" /*required*/ />
                                            </div>
                                            <div className="mt-2" style={{ textAlign: "right" }} id="show-password">
                                                <button type="button" className="btn btn-sm btn-light" onClick={() => {
                                                    if (showPass == true)
                                                        setshowPass(false);
                                                    else
                                                        setshowPass(true);
                                                }}>
                                                    {showPass ? "Cacher" : "Afficher"}
                                                </button>
                                            </div>
                                        </form>
                                        <form>
                                            <div>
                                                <label>Confirmation mot de passe</label>
                                                <input className="form-control" type={showPassConfirm ? "text" : "password"} placeholder="********" /*required*/ />
                                            </div>
                                            <div className="mt-2" style={{ textAlign: "right" }} >
                                                <button type="button" id="show-password-3" className="btn btn-sm btn-light" onClick={() => {
                                                    if (showPassConfirm == true)
                                                        setshowPassConfirm(false);
                                                    else
                                                        setshowPassConfirm(true);
                                                }}>
                                                    {showPass ? "Cacher" : "Afficher"}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4" id="signup-hr"></hr>
                            <button type="submit" className="btn btn-light btn-block" id="signup" onClick={routeChange}>M'inscrire</button>
                    </div>
                    {/* </div> */}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );

}