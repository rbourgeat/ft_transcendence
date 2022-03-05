import './Friends.scss';
import ReactDOM from 'react-dom';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

/**
 * @malatini
 * Préparation en cours du composant pour afficher la liste d'amis (a revoir)
 */
export default function Friends() {
    return (
        <div id="friends">
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
            </div>
            <Footer />
        </div>
    );
}
