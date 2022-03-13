import React, { useState, useContext} from 'react';

import './Welcome.scss';
import '../App/App.scss';
import '../../index.scss';
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import video1 from "../../public/pong-demo.mp4";

import TypeAnimation from 'react-type-animation';
import { useHistory } from 'react-router-dom'
//import Media from 'react-media';
import { UserContext } from "../App/UserContext";
import { login } from "./Login";
import { useCookies } from "react-cookie";

/**
 * @malatini
 * page de welcome (afficher si pas connecte, sinon rediriger - a continuer / revoir)
 * voir useContext (quand fini mettre dans dossier pages) ?
 * On laisse en fonction et pas en classe pour utiliser les hooks car je ne sais pas faire sans pour l'instant
 */
export default function Welcome() {

    const history = useHistory();

    const routeChange = (e: any) =>{
	  e.preventDefault();
      let path = `/auth`;
      history.push(path);
    }

    const [cookies, setCookie] = useCookies(["name"]);
    const [name, setName] = useState("");

    const {user, setUser} = useContext(UserContext);

    return (
        <>
        <Header />
        <div id="welcome--video-div-main">
            <div id="authors">
                <ul id="authors--ul">
                <TypeAnimation
                    cursor={true}
                    sequence={['Authors :', 5000, '']}
                    wrapper="figcaption"
                    repeat="Infitiny"
                />
                <br></br>
                    <li>bahaas</li>
                    <li>rbourgea</li>
                    <li>malatini</li>
                    <li>darbib</li>
                    <li>macrespo</li>
                    <button id="play-button-1" onClick={routeChange} className="detalii">Play !</button>
                    <br />
                    <br />

                    {/*<pre>{JSON.stringify(user, null, 2).length > 4 ? JSON.stringify(user, null, 2) : ""}</pre>
                    { user ? (<button onClick={ () => setUser(null)}>logout</button>) :
                        (<button onClick={ async () =>
                        {
                            const user = await login();
                            setUser(user);
                        }
                        }>)
                        login
                    </button>
                        )}*/}
                </ul>
            </div>
            <br></br>
                <div  id="welcome--video-div">
                    <video autoPlay loop muted src={video1} id="welcome--video-video" height="400px"/>
                </div>
            <Footer />
        </div>
        </>
    )
}
