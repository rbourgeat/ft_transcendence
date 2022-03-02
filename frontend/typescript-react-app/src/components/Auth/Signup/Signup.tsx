import './Signup.scss';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

import Axios from "axios";


function SignupPost(string p_email, string p_login, string p_password) {
    var self = this;
    Axios.post('/api/auth/register/', {
        email: p_email,
        login: p_login,
        password: p_password
    })
};

function Signup() {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/dashboard`;
        navigate(path);
    };

    const [showPass, setshowPass] = useState(false);
    const [showPassConfirm, setshowPassConfirm] = useState(false);
    const [showPassBis, setshowPassBis] = useState(false);

    // Axios.post('/api/auth/register/');
    //TODO: a reindenter
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
                                                <input className="form-control" type={showPass ? "text" : "password"} placeholder="********" />
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
                                                <input className="form-control" type={showPassConfirm ? "text" : "password"} placeholder="********" />
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
        </div>

    );
} export default Signup;

