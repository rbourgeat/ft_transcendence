import './Login.scss';
import React, { useState, useEffect } from 'react';
import ToastAlerts from "../../Utils/ToastAlerts/ToastAlerts"
import { ToastContainer } from 'react-toastify';
import axios from "axios";
import Dashboard from "../../Dashboard/Dashboard"
import myAxios from "../../Utils/Axios/Axios"

interface LoginProps {}

interface LoginState
{
  email?: string,
  password?: string,
  isLogged?: boolean
}

export default class Login extends React.Component<LoginProps, LoginState>
{
        constructor(props: LoginProps)
        {
            super(props);
            this.state = {
              email: "",
              password: ""
            }
        }
        
        submit=(event: any)=>
        {
          event.preventDefault();
            let ax = new myAxios(null);
            let res = ax.login(this.state.email, this.state.password);
        }

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
                    <input
                      className="form-control"
                      type="password"
                      placeholder="********"
                      value={this.state.password}
                      onChange={(e)=>{this.setState({password: e.target.value})}}
                    />
                  <div style={{ textAlign: "right" }} id="show-password">
                  </div>
                </div>
              <p id="connect-p"></p>
              <div id="formBasicConnexion">
              <button
                type="submit"
                className="btn btn-light btn-block"
                id="auth-btn-1"
                onClick={this.submit}
                >
                Me connecter
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
}
