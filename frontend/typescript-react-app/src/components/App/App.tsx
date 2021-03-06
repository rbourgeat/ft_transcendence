import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Auth from '../Auth/Auth';
import Welcome from '../Welcome/Welcome';
import NotFound from '../NotFound/NotFound';
import People from "../People/People";
import Game from "../Game/Game";
import Channels from "../Channels/Channels"
import axios from 'axios';
import Login2fa from '../Auth/Login2FA/Login2FA';
import Profile from "../Profile/Profile";
import Live from '../Live/Live';
import Settings from "../User/Settings/Settings";
import UserSub from "../User/UserSub";
import { ToastContainer } from "react-toastify";

let url_begin = "";

if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined) {
  url_begin = "http://localhost";
}

else
  url_begin = "http://".concat(process.env.REACT_APP_IP);

let selectedUser = "";

function App() {

  const [username, setUsername] = React.useState("");
  const [load, setLoaded] = React.useState(false);
  // const calledOnce = React.useRef(false);

  function getUser() {
    let url = url_begin.concat(":3000/api/auth/");
    let username = "";
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.defaults.withCredentials = true;
    axios.get(url)
      .then(res => {
        username = res.data.login;
        setUsername(username);
      })
      .catch((err) => {
        ;
      })
  }

  useEffect(() => {
    getUser();
    let isMounted = true;
    setLoaded(true);

		return () => { setLoaded(false)};
  }, []);

  useEffect(() => {
    // if (calledOnce.current) {
    //   return;
    // }
    if (localStorage.getItem("2fa") != "true" && localStorage.getItem("2fa") != "false")
      localStorage.setItem("2fa", "false");
    if (localStorage.getItem("loggedIn") != "true" && localStorage.getItem("loggedIn") != "false")
      localStorage.setItem("loggedIn", "false");
    // calledOnce.current = true;
    if (localStorage.getItem("2fa") != "true" && localStorage.getItem("2fa") != "false")
      localStorage.setItem("2fa", "false");
    if (localStorage.getItem("2faverif") != "true" && localStorage.getItem("2faverif") != "false")
      localStorage.setItem("2faverif", "false");
      // setLoad(false);
  }, []);

  return (
    <div id="main">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/auth" element={<Auth />} />
        {localStorage.getItem("loggedIn") == "false" ?
          <>
            <Route path="*" element={<Auth />} />
          </>
          : ""
        }
        {(localStorage.getItem("loggedIn") == "true" &&
          ((localStorage.getItem("2fa") == "true" && localStorage.getItem("2faverif") == "true") || (localStorage.getItem("2fa") == "false" && localStorage.getItem("2faverif") == "false")))
          ?
          <>
            <Route path="/user" element={<UserSub />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/live" element={<Live />} />
            <Route path="/auth" element={<UserSub />} />
            <Route path="/channels" element={<Channels username={username} />} />
            <Route path="/people" element={<People login={username} />} />
            <Route path="/game" element={<Game />} />
            <Route path="/profile/:login" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </>
          : ""
        }

        {localStorage.getItem("loggedIn") == "true" && localStorage.getItem("2fa") == "true" && localStorage.getItem("2faverif") == "false" ?
          <Route path="*" element={<Login2fa />} /> : ""}
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </div>
  );
}

export default App;
