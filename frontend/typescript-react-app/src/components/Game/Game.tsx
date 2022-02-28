import {useState,  useEffect, useLayoutEffect } from 'react';

import './Game.scss';
import ReactDOM from 'react-dom';
import useWindowDimensions from "./useWindowDimensions"
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

export default function Game() {
    //const { width, height } = useWindowSize();
    // let size = useWindowSize();
    let size = useWindowDimensions();
    return (
        <div id="game-root">
            <h1>Game !</h1>
            {/* <Sidebar /> */}
            {/* <Header /> */}
            {/* <div>
                <h3 id="game-title">Game</h3>
                <Canvas />
                <Footer />
            </div> */}
        </div>
    );
}