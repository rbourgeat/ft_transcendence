import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useMemo, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom'
import './App.scss';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Particles from "react-tsparticles";
import Auth from '../Auth/Auth';
import Welcome from '../Welcome/Welcome';
import NotFound from '../NotFound/NotFound';
import Search from "../Search/Search";
import Achievements from "../Achievements/Achievements";
import GameRules from "../GameRules/GameRules";
import CreateChan from "../Channels/CreateChan/CreateChan";
import People from "../People/People";
import Game from "../Game/Game";
import Login2FA from "../Auth/Login2FA/Login2FA"
import Channels from "../Channels/Channels"
import axios from 'axios';
import NotLogged from '../NotLogged/NotLogged'; import Login2fa from '../Auth/Login2FA/Login2FA';
import Profile from "../Profile/Profile";
import Live from '../Live/Live';
import Settings from "../User/Settings/Settings";
import UserSub from "../User/UserSub";

function App() {

  const [user, setUser] = useState(null);
  const [username, setUsername] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const calledOnce = React.useRef(false);

  const value = useMemo(() =>
    ({ user, setUser }), [user, setUser]);


  let socket = io("http://localhost:3000/chat", { query: { username: username } });

  async function getUser() {

    let url = "http://localhost:3000/api/auth/";
    let username = "";
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.defaults.withCredentials = true;
    await axios.get(url)
      .then(res => {
        username = res.data.login;
        setUsername(username);
      })
      .catch((err) => {
        console.log("Error while getting api auth");
      })
  }

  useEffect(() => {
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

  useEffect(() => {
    if (calledOnce.current) {
			return;}
    if (localStorage.getItem("2fa") != "true" && localStorage.getItem("2fa") != "false")
      localStorage.setItem("2fa", "false");
    if (localStorage.getItem("loggedIn") != "true" && localStorage.getItem("loggedIn") != "false")
      localStorage.setItem("loggedIn", "false");
    calledOnce.current = true;
    if (localStorage.getItem("2fa") != "true" && localStorage.getItem("2fa") != "false")
        localStorage.setItem("2fa", "false");
    if (localStorage.getItem("2faverif") != "true" && localStorage.getItem("2faverif") != "false")
      localStorage.setItem("2faverif", "false");
  }, []);

  let particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    <div id="main">
      <Particles
        id="tsparticles"
        options={{
          background: {
            color: {
              value: "#00000",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: false,
                mode: "push",
              },
              onHover: {
                enable: false,
                mode: "repulse",
              },
              resize: false,
            },
            modes: {
              bubble: {
                distance: 100,
                duration: 5,
                opacity: 0.8,
                size: 20,
              },
              push: {
                quantity: 20,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#54CFE8"
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: false,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "bottom",
              enable: true,
              outMode: "bounce",
              random: true,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 120,
              },
              value: 10,
            },
            opacity: {
              value: 0.3,
              random: true,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: false,
              value: 40,
            },
          },
          detectRetina: false
        }}
      />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/auth" element={<Auth />} />
        {(localStorage.getItem("loggedIn") == "true" &&
          ((localStorage.getItem("2fa") == "true" && localStorage.getItem("2faverif") == "true") || (localStorage.getItem("2fa") == "false" && localStorage.getItem("2faverif") == "false")))
          ?
          <>
            <Route path="/user" element={<UserSub/>} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/live" element={<Live />} />
            <Route path="/auth" element={<UserSub />} />
            <Route path="/channels" element={<Channels />} />
            <Route path="/people" element={<People login={username} />} />
            <Route path="/game" element={<Game />} />
            <Route path="/profile/:login" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
            {/*<Route path="/welcome" element={<Welcome />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Auth />} />*/}
          </>
          : ""
          }

        {localStorage.getItem("loggedIn") == "true" && localStorage.getItem("2fa") == "true" && localStorage.getItem("2faverif") == "false" ?
          <Route path="*" element={<Login2fa />} /> : ""}
        {(localStorage.getItem("2fa") == "true" && localStorage.getItem("2faverif") == "false") ?
          <Route path="*" element={<Login2FA />} />
          : ""}
      </Routes>
    </div>
  );
}

export default App;
