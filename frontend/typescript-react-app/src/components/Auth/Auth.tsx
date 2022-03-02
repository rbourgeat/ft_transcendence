import React, { useState } from 'react';
import './Auth.scss';
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

import Login from "./Login/Login"
import Signup from "./Signup/Signup"


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
            <Header />
            <div className="container" id="auth-container">
                <div id="auth-form-div">
                    <div id="auth--form1"/*className="d-flex justify-content-center"*/ >
                        <div id="form--auth1" className="forms">
                            <h2>Bienvenue ! </h2>
                            {/* <h2>Coucou</h2> */}
                            <p>Pour jouer, vous devez vous authentifier 🏓</p>
                            <div /*className="form__mb-3"*/ id="formAuth42">
                                <button type="submit" className="btn btn-dark btn-block" id="auth-btn-3" onClick={routeChange}>
                                    Authentification 42
                                    </button>
                            </div>
                            <Login />
                    </div>
                        <Signup />
                    </div>
                </div>
            </div>
        </>
    );

}