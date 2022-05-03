import React, { useState, useEffect } from 'react';
import './Auth.scss';
import Header from "../Header/Header";
import Login from "./Login/Login"
import Signup from "./Signup/Signup"
import FourtyTwo from "./42Auth/42Auth";
import Footer from "../Footer/Footer";
import { ToastContainer } from 'react-toastify';
import MyAxios from '../Utils/Axios/Axios';

export default function Auth() {

    useEffect(() => {
        if (localStorage.getItem("loggedIn") == "true") {
            //console.log("You are already logged in");
            if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
                window.top.location = "http://localhost:3030/settings";
            else
                window.top.location = "http://".concat(process.env.REACT_APP_IP).concat(":3030/settings");
        }
    }, []);

    return (
        <>
            <Header />
            <div className="container" id="auth-container">
                <div className="row d-flex justify-content-center">
                    {localStorage.getItem("loggedIn") != "true" ?
                        <>
                            <div id="auth-form-div" className="col-8">
                                <div id="auth--form1" className="row d-flex justify-content-center">
                                    <br />
                                    <div id="form--auth1" className="row d-flex justify-content-center">
                                        <p id="jouer">Pour jouer, vous devez vous authentifier 🏓 </p>
                                        <FourtyTwo />
                                        <br />
                                        <Signup />
                                        <br />
                                        <Login />
                                    </div>
                                    {/*<Login />*/}
                                </div>
                            </div>
                        </>
                        : <p></p>}
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover />
                </div>
            </div>
        </>
    );
}
