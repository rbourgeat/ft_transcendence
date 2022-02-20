import React from 'react';
import './Game.scss';
import Footer from "../Footer/Footer"

export default function Game() {
    return (
        <div /*id="game-div" ref={el => (this.div = el)}*/>
            <canvas id="currentGame" height="400px" width="600px"></canvas>
            <Footer />
        </div>
    )
}