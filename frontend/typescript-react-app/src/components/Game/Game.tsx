import {useState,  useEffect, useLayoutEffect } from 'react';

//A supprimmer
// import { useWindowSize } from 'usehooks-ts'
import './Game.scss';
import ReactDOM from 'react-dom';
import useWindowDimensions from "./useWindowDimensions"

// import Footer from "../Footer/Footer";
// import Canvas from "./Canvas";
// import Sidebar from "../Sidebar/Sidebar";
// import Header from "../Header/Header";
// import useWindowSize from 'react-use/lib/useWindowSize'

export default function Game() {
    //const { width, height } = useWindowSize();
    // let size = useWindowSize();
    let size = useWindowDimensions();
    return (
        <>
            <div></div>
            {/* <Sidebar /> */}
            {/* <Header /> */}
            {/* <div>
                <h3 id="game-title">Game</h3>
                <Canvas />
                <Footer />
            </div> */}
        </>
    );
}