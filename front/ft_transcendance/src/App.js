import logo from './logo.svg';
import './App.css';
import Auth from './Auth/Auth'
import Navbar from './Navbar/Navbar'
//Changer le css de l app sans utiliser bootstrap ?
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';

function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <Auth />
    </div>
  );
}

export default App;
