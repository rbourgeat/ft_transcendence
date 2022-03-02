import './Login.scss';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function Login() {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/dashboard`;
        navigate(path);
    };

    const [showPass, setshowPass] = useState(false);
    const [showPassConfirm, setshowPassConfirm] = useState(false);
    const [showPassBis, setshowPassBis] = useState(false);

    //TODO: a reindenter
    return (
        <div>
            <h3 id="se-connecter">Se connecter</h3>
                            <div id="formBasicEmail">
                                <label>Username</label>
                                <input className="form-control" type="username" placeholder="malatini"/>
                            </div>

                            <div id="formBasicPassword">
                                <label>Mot de passe</label>
                                <input className="form-control" type={showPassBis ? "text" : "password"} placeholder="********" />
                                <div style={{ textAlign: "right" }} id="show-password">
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
                            <hr className="my-4" id="me-connecter_hr"></hr>
                            <div id="formBasicConnexion">
                                <button type="submit" className="btn btn-light btn-block" id="auth-btn-1" onClick={routeChange}>Me connecter</button>
                            </div>
        </div>

    );
} export default Login;

