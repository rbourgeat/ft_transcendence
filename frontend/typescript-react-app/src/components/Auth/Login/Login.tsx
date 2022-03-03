import './Login.scss';
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";

//TODO: changer le statut offline moi meme possible
class Login extends React.Component 
{
    state = {
        email: "",
        password: ""
    }

    constructor(props)
    {
        super(props);
    }

    notifyDanger = () => 
        toast.warning('Oops ! Login or password incorrect', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

    notifySuccess = () => 
        toast.success('Login OK ! Redirecting...', {
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
                password: this.state.password,
            }
    
            const headers = {
                'Content-Type': 'application/json'
            };
    
            console.log(bod);
            let res = axios.post('http://localhost:3000/api/auth/log-in/', bod, {headers}).then(res=>{
                console.log(res.data);
                console.log(res.status)
                if (res.status == 200)
                {
                    this.notifySuccess();
                    //On redirige vers la page principale
                    const nav = useNavigate();
                    nav('/dashboard', { replace: true })
                    // const routeChange = () => {
                    //     let path = `/dashboard`;
                    //     navigate(path);
                    // };
                }
                else
                    this.notifyDanger();
            }).catch((error) => {
                console.log(error);
                this.notifyDanger();
            })
        }


    // const [showPass, setshowPass] = useState(false);
    // const [showPassConfirm, setshowPassConfirm] = useState(false);
    // const [showPassBis, setshowPassBis] = useState(false);

        render()
        {
            return (
                <div>
                    <h3 id="se-connecter">Se connecter</h3>
                    <div id="formBasicEmail">
                    <label>Email</label>
                    <input className="form-control" type="email"
                    placeholder="malatini"
                    value={this.state.email}
                     onChange={(e)=>{this.setState({email: e.target.value})}}
                    />
                </div>
                
                <div id="formBasicPassword">
                <label>Mot de passe</label>
                <input className="form-control" type="password" /*type={showPassBis ? "text" : "password"}*/ placeholder="********"
                    value={this.state.password}
                    onChange={(e)=>{this.setState({password: e.target.value})}}
                />
                <div style={{ textAlign: "right" }} id="show-password">
                <button type="button" className="btn btn-sm btn-light"
                
                /*onClick={() => 
                {
                    if (showPassBis == true)
                        setshowPassBis(false);
                    else
                        setshowPassBis(true);
                    }}*/>
                    {/* {showPass ? "Cacher" : "Afficher"} */}
                        Afficher
                        </button>
                    </div>
                </div>
            <p id="connect-p"></p>
            <hr className="my-4" id="me-connecter_hr"></hr>
            <div id="formBasicConnexion">
            <button type="submit" className="btn btn-light btn-block" id="auth-btn-1" onClick={this.submit}/*onClick={routeChange}*/>Me connecter</button>
        </div>
      </div>
            );
        }

} export default Login;