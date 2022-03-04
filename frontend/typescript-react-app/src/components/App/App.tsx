import React, { useState, useMemo } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Auth from '../Auth/Auth';
import Welcome from '../Welcome/Welcome';
import NotFound from '../NotFound/NotFound';
import Dashboard from '../Dashboard/Dashboard';
import User from '../User/User';
// import UserContext from './UserContext';
import 'bootstrap/dist/css/bootstrap.css';
import {UserContext} from './UserContext';
import { useCookies } from "react-cookie";

function App() {
  
  const [user, setUser] = useState(null);

  const value = useMemo( () => 
  ({user, setUser}), [user, setUser]);

  return (
    <div id="main">
      <Router>
        <Switch>
          {/*<UserContext.Provider value={{value, setValue}}>*/}
          <UserContext.Provider value={value}>
          <Route path="/welcome">
            <Welcome />
          </Route>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/user">
            <User/>
          </Route>
          </UserContext.Provider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

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
