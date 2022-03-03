import './Signup.scss';
import { useNavigate } from "react-router-dom";
import React , { useState, useEffect} from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";
import { AiFillPauseCircle } from 'react-icons/ai';


class Signup extends React.Component
{
    state = {
        username: "",
        email: "",
        password: "",
        password_conf: ""
    }

    constructor(props)
    {
        super(props);
    }

    notifyDanger = () => 
        toast.warning('Oops ! An error happened', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

    notifySuccess = () => 
        toast.success('🦄 Yes! You are now registered ! You may log in.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

    submit=(event)=>{
        event.preventDefault();
        axios.defaults.baseURL = 'http://localhost:3000/';
        axios.defaults.headers.post['Content-Type'] ='*';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

        const bod = {
            email: this.state.email,
            login: this.state.username,
            password:  this.state.password,
            password_confirmation: this.state.password_conf
        }

        const headers = {
            'Content-Type': 'application/json'
        };

        console.log(bod);
        let res = axios.post('http://localhost:3000/api/auth/register/', bod, {headers}).then(res=>{
            console.log(res.data);
            console.log(res.status)
            if (res.status == 201)
                this.notifySuccess();
            else
                this.notifyDanger();
        }).catch((error) => {
            console.log(error);
            this.notifyDanger();
        })
    }

    // HandleClickParams(Email: string, Username: string, 
    //     Password: string, PasswordConfirmation: string)
    // {
    
    //     let payload = {
    //         email: Email,
    //         login: Username, 
    //         password: Password,
    //         password_confirmation: PasswordConfirmation
    //     }
    //    let res = axios.post('/auth/register', payload);
    //    console.log(res);
    // }

    //On definit la "propriete" de la classe Signup (equivalent attribut membre)
    rep = {};

    instance = axios.create({
        baseURL: "http://localhost:3000/api"}
    );

    notifySuccessParam(Param: string) {
        toast.success(Param, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })};

    notifyDangerParam(Param: string) {
            toast.warning(Param, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })};    

    //TODO: a revoir
    // [showPass: string, setshowPass: string] = useState(false);
    // [showPassConfirm: string, setshowPassConfirm:string] = useState(false);
    // [showPassBis: string, setshowPassBis: string] = useState(false);


    //TODO: a reindenter
    render() {
    return (
        <div>
             <div className="d-flex justify-content-center"></div>
                        <div className="forms" id="form--auth2">
                            <h3 id="sinscrire">S'inscrire</h3>
                            <div id="formSignupUsername">
                                <label>Username</label>
                                <input className="form-control" type="text" placeholder="malatini" 
                            
                                value={this.state.username}
                                onChange={(e)=>{this.setState({username: e.target.value})}}
                                
                                />
                            </div>

                            <div id="formSignUpEmail">
                                <label>Email</label>
                                <input className="form-control" type="email" placeholder="malatini@student.42.fr"
                                value={this.state.email}

                                onChange={(e)=>{this.setState({email: e.target.value})}}
                                />
                            </div>
                            <div id="password-form">
                                <div id="sub-form">
                                    <div>
                                        <form>
                                            <div>
                                                <label>Mot de passe</label>
                                                <input className="form-control" type=/*{showPass ? "text" : */"password"/*}*/ placeholder="********" value={this.state.password}
                                                
                                                onChange={(e)=>{this.setState({password: e.target.value})}}
                                                />
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
                                                <input className="form-control" type=/*{showPassConfirm ? "text" : */"password"/*}*/ placeholder="********"
                                                value={this.state.password_conf}
                                                
                                                onChange={(e)=>{this.setState({password_conf: e.target.value})}}
                                                />
                                            </div>
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
                            <button onClick={this.submit} className="btn btn-light btn-block" id="signup" 
                            // onClick={this.HandleClick}
                            // onClick={() => this.HandleClickParams(this.state.email, this.state.username, this.state.password, this.state.password_conf)}
    
                            >M'inscrire
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
                            </button>
                    </div> 
        </div>

    );
     }
} export default Signup;