import React, { useState, useEffect} from 'react';
import Nav from "../Nav/Nav";
import './User.scss'

//On va mettre en props ce qu on va utiliser pour creer le components et en state ce qui doit etre modifie
type UserProps = {
  username?: string,
  email?: string,
  // password?: string,
  // passord_conf?: string
}

type MyState = {
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

};

export default class User extends React.Component<UserProps, MyState> {


    state: MyState = {
    // optional second annotation for better type inference
    count: 0,
    date: new Date(),
    avatar: "https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg",
     //TODO: Checker connection ou pas
     status: "Online",
     totalGames: 0,
     totalWins: 0,
     totalLoss: 0,
     winLoss: 0,
     friends: {},
     channels: {}
    }

    // static props: UserProps = {
    //   username: "",
    //   email: "",
    // }

  //il va falloir verifier que la valeur des props sont a jours
  render() {
    return (
      <div id="user--div">
      <Nav />
        <div className="container">
          <div className="row d-flex justify-content-center text-center">
            <div className="col-4" id="bonjour--user">
              <h1>Bonjour
                <span>{this.props.username ? this.props.username : ""} </span> !
              </h1>
              <br />
              <div className="user--stats">
              <h2>Information</h2>
              <img
                // src={this.props.avatar}
                src="https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg"
                height="80"
                alt="avatar"
                id="avatar-id"
                />
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
