import React, { useState, useEffect} from 'react';
import Nav from "../Nav/Nav";
import './User.scss';
import axios from 'axios';
import MyAxios from '../Utils/Axios/Axios';
import { ToastContainer, toast } from 'react-toastify';

//On va mettre en props ce qu on va utiliser pour creer le components et en state ce qui doit etre modifie
export interface UserProps {
  username?: string,
  email?: string,
  password?: string,
  password_conf?: string,
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

/**
 * @malatini
 * Page (et sous composants à faire) du User / Profile
 */
export default class User extends React.Component<UserProps, MyState>
{
    constructor(props: UserProps)
    {
      super(props);
      this.state = {
        count: 0,
        date: new Date(),
        //Attention ca doit etre en accord avec la bdd
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

    // TODO: a reprendre
    post_avatar=(event) =>
    {

        //axios.defaults.baseURL = 'http://localhost:3000/';
        //axios.defaults.headers.get['Content-Type'] ='*';
        //axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
        let username = this.state.username;
        let url = "http://localhost:3000/api/user/".concat(username);
        let ax = new MyAxios({});
        //let avatar: string;
        //ax.post_avatar(url);
        //avatar = ax.post_avatar(url);
    }

    edit_avatar()
    {
      //let path: string  = "/user/" + this.props.username + "/avatar";
      //TODO: revoir le design de ma classe ?
      let myAx = new MyAxios({
        method: "POST",
        ressource: "/user/:id/avatar",
        email: this.props.email,
        password: this.props.password
      });

      //this.setState({avatar: })
      //let res = myAx.post_avatar(this.state.avatar);
    }

    imageHandler = (e: any) => {
      const reader = new FileReader();
      reader.onload = ()  => {
        if (reader.readyState === 2)
        {
          this.setState({avatar: reader.result as string});
        }
      }
      reader.readAsDataURL(e.target.files[0]);
      //this.edit_avatar();
    }


  //il va falloir verifier que la valeur des props sont a jours
  render() {

    //const {avatar} = this.state;
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
               // src={this.state.avatar}
               src={this.state.avatar}
                height="80"
                alt="avatar"
                id="avatar-id"
                />
                <br/>
                <br/>
                {/*<button
                >
                  Change avatar
                </button>*/}
                <div className="col-4 mx-auto text-center" id="input-div">
                  <input type="file" name="image-upload" id="input--upload" accept="image/*" onChange={this.imageHandler}/>
                    <div className="label">
                    {/*<label htmlFor="input" id="label">
                        <i className='material-icons'></i>
                    </label>*/}
                    </div>
                  </div>
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
