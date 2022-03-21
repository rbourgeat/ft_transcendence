import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useMemo, useEffect} from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

//import io from "socket.io-client"

import Auth from '../Auth/Auth';
import Welcome from '../Welcome/Welcome';
import NotFound from '../NotFound/NotFound';
import Dashboard from '../Dashboard/Dashboard';
import UserMain from '../User/UserMain';
// import UserSub from '../User/UserSub';
import {UserContext} from './UserContext';
import { useCookies } from "react-cookie";
import Channels from "../Channels/Channels";
import Search from "../Search/Search";
import Achievements from "../Achievements/Achievements";
import GameRules from "../GameRules/GameRules";
import CreateChan from "../Channels/CreateChan/CreateChan";

function App() {

  const [user, setUser] = useState(null);

  const value = useMemo( () =>
  ({user, setUser}), [user, setUser]);

  return (
    <div id="main">
      <UserContext.Provider value={value}>
      <Routes>
		 <Route path="/" element={<Welcome />} />
		 <Route path="/welcome" element={<Welcome />} />
		 <Route path="/auth" element={<Auth />} />
		 <Route path="/dashboard" element={<Dashboard />}/>
		 <Route path="/user" element={<UserMain username="dummy5" />} />
		 <Route path="/chat" element={<Channels username="dummy5"/>} />
     <Route path="/createchat" element={<CreateChan/>} />
		 <Route path="/search" element={<Search />}  />
		 <Route path="/achievements" element={<Achievements />}  />
		 <Route path="*" element={<NotFound />}  />
      </Routes>
      </UserContext.Provider>
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
