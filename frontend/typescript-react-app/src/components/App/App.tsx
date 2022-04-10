import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useMemo, useEffect } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Auth from '../Auth/Auth';
import Welcome from '../Welcome/Welcome';
import NotFound from '../NotFound/NotFound';
import Dashboard from '../Dashboard/Dashboard';
import UserMain from '../User/UserMain';
import Search from "../Search/Search";
import Achievements from "../Achievements/Achievements";
import GameRules from "../GameRules/GameRules";
import CreateChan from "../Channels/CreateChan/CreateChan";
import Stats from "../Stats/Stats";
import People from "../People/People";
import Game from "../Game/Game";
import PlayWatch from "../Playwatch/Playwatch";
import Login2FA from "../Auth/Login2FA/Login2FA"
import Channels from "../Channels/Channels"
import { io } from 'socket.io-client';
import axios from 'axios';
import NotLogged from '../NotLogged/NotLogged';
//import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event';

function App() {

  const [user, setUser] = useState(null);
  const [username, setUsername] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const value = useMemo(() =>
    ({ user, setUser }), [user, setUser]);

  let socket = io("http://localhost:3000/chat", { query: { username: username } });

  let cookieCheck = document.cookie.match("Authentication");

  async function getUser() {
    let url = "http://localhost:3000/api/auth/";
    let username = "";
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.defaults.withCredentials = true;
    await axios.get(url)
      .then(res => {
       //console.log("Status code is " + res.status);
        username = res.data.login;
        setUsername(username);
        //setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log("Error while getting api auth");
      })
  }

  useEffect(() => {
    //console.log("coucou");
    //console.log("Cookie check is" + cookieCheck);
    //if (cookieCheck)
    getUser();
    if (username) {
      let socket = io("http://localhost:3000/chat", { query: { username: username } });
      socket.on('connect', () => {
        console.log(`online ` + username);
        socket.emit('status', username + ':online')
      })

      socket.on('disconnect', () => {
        console.log(`offline ` + username);
        socket.emit('status', username + ':offline')
      })
    }
  }, []);

  //useEffect(() => {
  //  console.log("Cookie was edited !");
  //  //cookieCheck = document.cookie.match("Authentication");
  //  //console.log("cookie is " + cookieCheck);
  //}, [cookieCheck]);


  return (
    <div id="main">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/auth" element={<Auth />} />
        {localStorage.getItem("loggedIn") == "true" ?
        <>
          <Route path="/user" element={<UserMain />} />
          <Route path="/chat" element={<CreateChan />} />
          <Route path="/channels" element={<Channels />} />
          <Route path="/search" element={<Search />} />
          <Route path="/stats" element={<Stats login={username} />} />
          <Route path="/achievements" element={<Achievements login={username} />} />
          <Route path="/people" element={<People />} />
          <Route path="/game" element={<Game />} />
          <Route path="/2fa" element={<Login2FA />} />
          <Route path="*" element={<NotFound />} />
          </> : <Route path="*" element={<NotLogged />} />
        }
        {/*<Route path="/2fa" element={<Login2FA />} />
        <Route path="*" element={<NotFound />} />*/}
      </Routes>
    </div>
  );
}

export default App;
