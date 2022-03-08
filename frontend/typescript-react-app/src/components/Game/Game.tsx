import {useState,  useEffect, useLayoutEffect } from 'react';
import './Game.scss';
import ReactDOM from 'react-dom';
import useWindowDimensions from "./useWindowDimensions"
import Header from "../Header/Header";

/**
 * Attention à tout mettre en classe et pas en fonction
 */
export default function Game() {
    //const { width, height } = useWindowSize();
    // let size = useWindowSize();
    let size = useWindowDimensions();
    return (
        <div id="game-root">
            <h1>Game !</h1>
            <canvas></canvas>
            {/* <Header /> */}
            {/* <div>
                <h3 id="game-title">Game</h3>
                <Canvas />
                <Footer />
            </div> */}
        </div>
    );
}
