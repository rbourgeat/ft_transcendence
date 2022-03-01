import './Friends.scss';
import ReactDOM from 'react-dom';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

export default function Friends() {
    return (
        <div id="friends">
            {/* <Header /> */}
            <Nav /> 
            <div className="container">
            <h1>Friends</h1>
                <br/>
                <div className="row" id="friends-title">
                    <div className="col">
                        <span>Login</span>
                    </div>
                    <div className="col"><span>Guild</span></div>
                    <div className="col"><span>Last score</span></div>
                    <div className="col"><span>Games</span></div>
                    <div className="col"><span>W/L</span></div>
                </div>
                {/* On va afficher jusqu a 10 amis ? */}
            </div>
            <Footer />
        </div>
    );
}