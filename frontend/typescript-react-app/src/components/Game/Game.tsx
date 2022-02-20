import React from 'react';
import './Game.scss';
import Footer from "../Footer/Footer"
import Canvas from "./Canvas"

export default function Game() {
    return (
        <div /*id="game-div" ref={el => (this.div = el)}*/>
            {/* <canvas id="currentGame" height="400px" width="600px"></canvas> */}
            <h3 id="game-title">Game</h3>
            <Canvas />
            <Footer />
        </div>
    )
}