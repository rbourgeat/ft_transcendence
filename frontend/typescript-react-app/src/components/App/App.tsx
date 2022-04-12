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

//import myParticles from "../Particules/Particules/";
import Particles from "react-tsparticles";
import Auth from '../Auth/Auth';
import Welcome from '../Welcome/Welcome';
import NotFound from '../NotFound/NotFound';
import Dashboard from '../Dashboard/Dashboard';
import UserMain from '../User/UserMain';
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

function App() {

  const [user, setUser] = useState(null);
  const [username, setUsername] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const value = useMemo(() =>
    ({ user, setUser }), [user, setUser]);

  let socket = io("http://localhost:3000/chat", { query: { username: username } });

  let cookieCheck = document.cookie.match("Authentication");

  async function getUser() {
    if (localStorage.getItem("loggedIn") != "true")
    {
      console.log("You are not logged in.")
        return ;
    }
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
    if (localStorage.getItem("2fa") != "true" && localStorage.getItem("2fa") != "false") {
      localStorage.setItem("2fa", "false");
    }
    if (localStorage.getItem("loggedIn") != "true" && localStorage.getItem("loggedIn") != "false") {
      localStorage.setItem("loggedIn", "false");
    }
  }, []);

  //let particlesInit = (main: any) => {
  //  console.log(main);
  //};

  //let particlesLoaded = (container: any) => {
  //  console.log(container);
  //};

  //let  particlesInit = (main) => {
  //  console.log(main);

  //  // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  //};

  let particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    <div id="main">
      {/*<myParticules />*/}


      <Particles
        id="tsparticles"
        //init={particlesInit}
        //loaded={particlesLoaded}
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
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }}
      />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/auth" element={<Auth />} />
        {localStorage.getItem("loggedIn") == "false" ?
          <>
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotLogged />} />
          </>
          : ""}

        {localStorage.getItem("loggedIn") == "true" && localStorage.getItem("2fa") == "true" && localStorage.getItem("2faverif") == "false" ?
          <Route path="*" element={<Login2fa />} /> : ""}

        {(localStorage.getItem("2fa") == "true" && localStorage.getItem("2faverif") == "false") ?
          <Route path="*" element={<Login2FA />} />
          :
          <>
            <Route path="/user" element={<UserMain />} />
            <Route path="/live" element={<Live />} />
            <Route path="/chat" element={<CreateChan endpoint={undefined} action={undefined} />} />
            <Route path="/auth" element={<UserMain />} />
            <Route path="/channels" element={<Channels />} />
            <Route path="/people" element={<People login={username} />} />
            <Route path="/game" element={<Game />} />
            <Route path="/2fa" element={<Login2FA />} />
            <Route path="/profile/:login" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </>}
      </Routes>
    </div>
  );
}

export default App;
