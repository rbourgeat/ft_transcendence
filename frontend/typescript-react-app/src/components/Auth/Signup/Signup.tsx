import './Signup.scss';
import { useNavigate } from "react-router-dom";
import React , { useState } from 'react';
// import PropTypes from "prop-types";

import Axios from "axios";




class Signup extends React.Component {

    constructor(props)
    {
        super(props);

    }

    //On definit la "propriete" de la classe Signup (equivalent attribut membre)
    rep = {};

    SignupPost(Email: string, Login: string, Password: string) {
    var self = this;
    Axios.post('/api/auth/register/', {
        email: Email,
        login: Login,
        password: Password
    }).
    then((rep) =>  { this.rep = rep.data})
    .catch((err) => {
        self.rep = err;
    })
};

    //TODO: a revoir (fonction anynome, callback etc)
    navigate = useNavigate();

    routeChange = () => {
        let path = `/dashboard`;
        this.navigate(path);
    };

    //TODO: pas bon    
    // [showPass: string, setshowPass: string] = useState(false);
    // [showPassConfirm: string, setshowPassConfirm:string] = useState(false);
    // [showPassBis: string, setshowPassBis: string] = useState(false);

    // Axios.post('/api/auth/register/');

    //TODO: a reindenter
    render() {
    return (
        <div>
             <div className="d-flex justify-content-center"></div>
                        <div className="forms" id="form--auth2">
                            <h3 id="sinscrire">S'inscrire</h3>
                            <div id="formSignupUsername">
                                <label>Username</label>
                                <input className="form-control" type="username" placeholder="malatini" />
                            </div>

                            <div id="formSignUpEmail">
                                <label>Email</label>
                                <input className="form-control" type="email" placeholder="malatini@student.42.fr" />
                            </div>
                            <div id="password-form">
                                <div id="sub-form">
                                    <div>
                                        <form>
                                            <div>
                                                <label>Mot de passe</label>
                                                <input className="form-control" type=/*{showPass ? "text" : */"password"/*}*/ placeholder="********" />
                                            </div>
                                            <div className="mt-2" style={{ textAlign: "right" }} id="show-password">
                                                <button type="button" className="btn btn-sm btn-light" /*onClick={() => {
                                                    if (showPass == true)
                                                        setshowPass(false);
                                                    else
                                                        setshowPass(true);
                                                }}*/>
                                                    Afficher
                                                    {/* {showPass ? "Cacher" : "Afficher"} */}
                                                </button>
                                            </div>
                                        </form>
                                        <form>
                                            <div>
                                                <label>Confirmation mot de passe</label>
                                                <input className="form-control" type=/*{showPassConfirm ? "text" : */"password"/*}*/ placeholder="********" />
                                            </div>/*
                                            <div className="mt-2" style={{ textAlign: "right" }} >
                                                <button type="button" id="show-password-3" className="btn btn-sm btn-light" /*onClick={() => {
                                                    if (showPassConfirm == true)
                                                        setshowPassConfirm(false);
                                                    else
                                                        setshowPassConfirm(true);
                                                }}*/>
                                                    Afficher
                                                    {/* {showPass ? "Cacher" : "Afficher"} */}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4" id="signup-hr"></hr>
                            <button type="submit" className="btn btn-light btn-block" id="signup" /*onClick={this.SignupPost("coucou", "ca va", "bien")}*/>M'inscrire
                            {/* {this.state.display} */}
                            </button>
                    </div> 
        </div>

    );
     }
} export default Signup;

