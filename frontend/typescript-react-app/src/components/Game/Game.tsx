import {useState,  useEffect, useLayoutEffect } from 'react';
import './Game.scss';
import ReactDOM from 'react-dom';
import useWindowDimensions from "./useWindowDimensions"
import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import GameRules from "../GameRules/GameRules";

/**
 * Attention à tout mettre en classe et pas en fonction
 */
export default function Game() {
    //const { width, height } = useWindowSize();
    // let size = useWindowSize();
    let size = useWindowDimensions();
    return (
        <div id="game-root">
            <Nav />
            <div className="container">
            <div className="row d-flex justify-content-justify text-justify">
                    <h1 id="title--game" className="text">GAME</h1>
                    <h2 className="text">to do darbib</h2>
                    {/*<canvas></canvas>*/}
                    <GameRules />
                </div>
            </div>
            <Footer />
        </div>
    );
}
