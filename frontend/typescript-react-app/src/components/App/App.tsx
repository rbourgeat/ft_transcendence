import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useMemo, useEffect} from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

//import io from "socket.io-client"
import {UserContext} from './UserContext';
import { useCookies, Cookies } from "react-cookie";

import Auth from '../Auth/Auth';
import Welcome from '../Welcome/Welcome';
import NotFound from '../NotFound/NotFound';
import Dashboard from '../Dashboard/Dashboard';//affiche les statistique et un match history focus sur le user
import UserMain from '../User/UserMain';
//import Channels from "../Channels/Channels";//channel -> chat
import Search from "../Search/Search";
import Achievements from "../Achievements/Achievements";
import GameRules from "../GameRules/GameRules";
import CreateChan from "../Channels/CreateChan/CreateChan";
import { CookiesProvider } from "react-cookie";
import Stats from "../Stats/Stats";//Stats équivalent Leaderboard ?
import People from "../People/People";
import Game from "../Game/Game";

function App() {
  const [user, setUser] = useState(null);
  const value = useMemo( () =>
  ({user, setUser}), [user, setUser]);

  return (
    <div id="main">
      <CookiesProvider>
          <UserContext.Provider value={value}>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />}/>
              <Route path="/user" element={<UserMain /*username="malatini" */ />} />
              <Route path="/chat" element={<CreateChan login="malatini"/>} />
              <Route path="/search" element={<Search />}  />
              <Route path="/stats" element={<Stats />}  />
              <Route path="/achievements" element={<Achievements />}  />
              <Route path="/people" element={<People />}  />
              <Route path="/game" element={<Game />}  />
              <Route path="*" element={<NotFound />}  />
            </Routes>
          </UserContext.Provider>
        </CookiesProvider>
    </div>
  );
}

export default App;

// Tentative pour transformer en classe infructueuse pour l instant

// class App extends React.Component {
//
//   constructor(props)
//   {
//     super(props);
//   }
//
//   render ()
//   {
//     return (
//       <div id="main">
//         <Router>
//           <Switch>
//             <Route path="/welcome">
//               <Welcome />
//             </Route>
//             <Route exact path="/">
//               <Welcome />
//             </Route>
//             <Route path="/auth">
//               <Auth />
//             </Route>
//             <Route path="/dashboard">
//               <Dashboard />
//             </Route>
//           </Switch>
//
//         </Router>
//       </div>
//     )
//   }
// } export default App;
