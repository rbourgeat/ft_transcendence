import React, { useState, useContext } from 'react';
import './Welcome.scss';
import '../App/App.scss';
import '../../index.scss';

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import video1 from "../../public/pong-demo.mp4";
import TypeAnimation from 'react-type-animation';
import { Redirect, useHistory, Link, withRoute, useNavigate, withRouter} from 'react-router-dom'
//import  { withRouter } from "react-router";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";
import Media from 'react-media';
import { UserContext } from "../App/UserContext";
import { login } from "./Login";

export interface WelcomeProps {
    //history?: Object
    
}

export interface WelcomeState {
    //history?: Object
}

{/*<WelcomeProps, WelcomeState>*/}
export default class Welcome extends React.Component<{}, {}>
{
    // constructor(props: WelcomeProps)
    // {
    //     super(props);
    // }
    
    //history = useHistory();

    // routeChange = () => 
    // {
    //   this.history.push('/auth');
    // }

    //const {user, setUser} = useContext(UserContext);

    render ()
    {
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
                        <button id="play-button-1" /*onClick={this.routeChange}*/ className="detalii">Play !</button>
                        
                        <br />
                        <br />
                        {/*
                        <pre>{JSON.stringify(user, null, 2).length > 4 ? JSON.stringify(user, null, 2) : ""}</pre>
                        { user ? (<button onClick={ () => setUser(null)}>logout</button>) : 
                            (<button onClick={ async () => 
                            {
                                const user = await login();
                                setUser(user);
                            }
                            }>
                            login
                        </button>)
                        }
                    */}
                    </ul>
                </div>
                <br></br>
                    <div  id="welcome--video-div">
                        {/*<video autoPlay loop muted src={video1} id="welcome--video-video" height="400px"/>*/}
                    </div>
                <Footer />
            </div>
            </>
     )
}}