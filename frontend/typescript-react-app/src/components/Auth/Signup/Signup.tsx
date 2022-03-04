import './Signup.scss';
//import { useNavigate } from "react-router-dom";
import React , { useState, useEffect} from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastAlerts from "../../Utils/ToastAlerts/ToastAlerts"

import axios from "axios";

class Signup extends React.Component
{
  //Equivalent du hook d etat
  state = {
      username: "",
      email: "",
      password: "",
      password_conf: "",
      open: false,
      open2: false
  }
  constructor(props)
  {
      super(props);
  }

    resetName = function() {
      this.setState({
        email: '',
        username: '',
        password: '',
        password_conf: ''
      });
    }

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

        let toast = new ToastAlerts(null);
        console.log(bod);

        let res = axios.post('http://localhost:3000/api/auth/register/', bod, {headers}).then(res=>{
            console.log(res.data);
            console.log(res.status)

            if (res.status == 201)
            {
              toast.notifySuccess('🦄 Yes! You are now registered ! You may log in.');
              //const nav = useNavigate();
              //redirection
              //nav('/welcome', { replace: true })
            }
            else
            {
              toast.notifyDanger('Oops ! An error happened');
            }
        }).catch((error) => {
            console.log(error);
            toast.notifyDanger('Oops ! An error happened');
        })
        //on vide ce qu il y a dans les inputs
        this.resetName();
    }

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

    // [showPass: string, setshowPass: string] = useState(false);
    // [showPassConfirm: string, setshowPassConfirm:string] = useState(false);
    // [showPassBis: string, setshowPassBis: string] = useState(false);

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
                                                type={this.state.open ? "text" : "password"}
                                                placeholder="********"
                                                value={this.state.password}
                                                onChange={(e)=>{this.setState({password: e.target.value})}} />
                                            </div>
                                        </form>

                                        <form>
                                            <div>
                                                <label>Confirmation mot de passe</label>
                                                <input className="form-control"
                                                  type={this.state.open2 ? "text" : "password"}
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
                            <hr className="my-4" id="signup-hr"></hr>
                            <button
                              onClick={this.submit}
                              className="btn btn-light btn-block"
                              id="signup"
                            >
                                M'inscrire
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
