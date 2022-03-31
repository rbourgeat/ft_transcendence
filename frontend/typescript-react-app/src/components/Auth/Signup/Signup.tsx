import './Signup.scss';
import React , { useState, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastAlerts from "../../Utils/ToastAlerts/ToastAlerts"
import axios from "axios";
import myAxios from "../../Utils/Axios/Axios"

/**
 * @malatini
 * Page Auth, permet de register un user (ajout dans la bdd, permettra de se connecter si OK)
 */
interface SignupProps {}

interface SignupState {
    username?: string,
    email?: string,
    password?: string,
    password_conf?: string
    /* Pour les boutons afficher mot de pase
    open: bool,
    open2: bool
    */
}

class Signup extends React.Component<SignupProps, SignupState>
{
    constructor(props: SignupProps)
    {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            password_conf: ""
        }
    }

    //Utile pour vider le formulaire quand on a cliqué sur le bouton (a mettre dans utils)
    resetName = function() {
    this.setState({
        email: '',
        username: '',
        password: '',
        password_conf: ''
        });
    }

    submit=(event: any)=>
    {
        event.preventDefault();
        let ax = new myAxios(
        {
            method: "POST",
            ressource: "/user/auth",
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            password_conf: this.state.password_conf
        })
        //let res = ax.signup(this.state.username, this.state.email, this.state.password, this.state.password_conf);
        let res = ax.signup();
        //console.log(res);
        this.resetName();
    }

    render() {
        return (
            <div>
                <div className="d-flex justify-content-center"></div>
                        <div className="forms" id="form--auth2">
                            <h3 id="sinscrire">S'inscrire</h3>
                            <div id="formSignupUsername">
                                <label>Username</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="malatini"
                                    value={this.state.username}
                                    onChange={(e)=>{this.setState({username: e.target.value})}} />
                            </div>

                            <div id="formSignUpEmail">
                                <label>Email</label>
                                <input
                                    className="form-control"
                                    type="email"
                                    placeholder="malatini@student.42.fr"
                                    value={this.state.email}
                                    onChange={(e)=>{this.setState({email: e.target.value})}} />
                            </div>
                            <div id="password-form">
                                <div id="sub-form">
                                    <div>
                                        <form>
                                            <div>
                                                <label>Mot de passe</label>
                                                <input
                                                className="form-control"
                                               // type={this.state.open ? "text" : "password"}
                                                type="password"
                                                placeholder="********"
                                                value={this.state.password}
                                                onChange={(e)=>{this.setState({password: e.target.value})}} />
                                            </div>
                                        </form>
                                        <form>
                                            <div>
                                                <label>Confirmation mot de passe</label>
                                                <input className="form-control"
                                                  //type={this.state.open2 ? "text" : "password"}
                                                    type="password"
                                                    placeholder="********"
                                                    value={this.state.password_conf}
                                                    onChange={(e)=>{this.setState({password_conf: e.target.value})}}/>
                                            </div>
                                            <div className="mt-2" style={{ textAlign: "right" }} >
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            {/*<hr className="my-4" id="signup-hr"></hr>*/}
                            <button
                                onClick={this.submit}
                                className="btn btn-light btn-block"
                                id="signup"
                            >
                                M'inscrire
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
} export default Signup;
