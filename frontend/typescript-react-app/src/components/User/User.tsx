import React, { useState, useEffect} from 'react';
import Nav from "../Nav/Nav";
import './User.scss';
import axios from 'axios';
import MyAxios from '../Axios/Axios';
import { ToastContainer, toast } from 'react-toastify';

//import { Link } from 'react-router-dom';
//creer un user avec le contexte de la connection?

//On va mettre en props ce qu on va utiliser pour creer le components et en state ce qui doit etre modifie
export interface UserProps {
  username?: string,
  email?: string,
  password?: string,
  password_conf?: string
}

export interface MyState {
  count: number,// like this
  date: Date,
  name?: string,
  avatar?: string,
  status?: string,
  totalGames?: number,
  totalWins?: number,
  totalLoss?: number,
  winLoss?: number,
  friends?: Object,
  channels?: Object,
  cookie?: string,

  username?: string
};

export default class User extends React.Component<UserProps, MyState>
{

    constructor(props: UserProps)
    {
      super(props);
      this.state = {
        count: 0,
        date: new Date(),
        avatar: "https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg",
         status: "Online",
         totalGames: 0,
         totalWins: 0,
         totalLoss: 0,
         winLoss: 0,
         friends: {},
         channels: {},
         username: this.props.username,
      }
    }

    //On va modifier le state
    post_avatar=(event) =>
    {
      //if (this.props.username && this.props.username != "null")
      //{
        let username = this.state.username;
        axios.defaults.baseURL = 'http://localhost:3000/';
        axios.defaults.headers.get['Content-Type'] ='*';
        axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
        let url = "http://localhost:3000/api/user/".concat(username);
        //+ this.props.username;
        console.log(url);
        let ax = new MyAxios({});
        let avatar: string;
        avatar = ax.get_avatar(url);
        //return (avatar);
        //console.log(res);
      //}
    }

    //get_avatar(): string
    //{
    //  //if (this.props.username && this.props.username != "null")
    //  //{
    //    console.log("get avatar called");
    //    let username = this.state.username;
    //    axios.defaults.baseURL = 'http://localhost:3000/';
    //    axios.defaults.headers.get['Content-Type'] ='*';
    //    axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
    //   let url = "http://localhost:3000/api/user/".concat(username);
    //    //+ this.props.username;
    //    console.log(url);
    //    let ax = new MyAxios({});
    //    let avatar: string = ax.get_avatar(url)!;
    //    console.log(avatar);
    //    return (avatar);
    //    //console.log(res);
    //  //}
    //}

  //il va falloir verifier que la valeur des props sont a jours
  render() {
    return (
      <div id="user--div">
      <Nav />
        <div className="container">
          <div className="row d-flex justify-content-center text-center">
            <div className="col-4" id="bonjour--user">
              <h1>Bonjour <span>{this.props.username ? this.props.username : ""} </span>
              </h1>
              <br />
              <div className="user--stats">
              <h2>Information</h2>
              <img
                // src={this.props.avatar}
                src={this.state.avatar}
                height="80"
                alt="avatar"
                id="avatar-id"
                />
                <br/>
                <br/>
                <button
                  /*onClick={this.get_avatar}*/
                >
                  Change avatar
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
                <br />
                <br/>
                <p>Total games : <span className="span--stats">{this.state.totalGames ? this.state.totalGames : 0}</span></p>
                <p>Total wins : <span className="span--stats">{this.state.totalWins ? this.state.totalWins : 0}</span></p>
                <p>Total loss : <span className="span--stats">{this.state.totalLoss ? this.state.totalLoss : 0}</span></p>
                <p>Win/loss ratio : <span className="span--stats">{this.state.winLoss ? this.state.winLoss : 0}</span></p>
                {/*
                  <p>Friends : <span>{this.props.totalLoss}</span></p>
                  <p>Channels : <span>{this.props.totalLoss}</span></p>
                  <h2 id="user--time">Il est {this.state.date.toLocaleTimeString()}.</h2>
                */}
              </div>

              <br />
              <br />
              <br />
              <br />
              </div>
            </div>
          </div>
      </div>
    );
  }
}
// export default User;
