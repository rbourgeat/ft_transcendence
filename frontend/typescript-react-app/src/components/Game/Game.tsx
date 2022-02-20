import React from 'react';
import './Game.scss';
import Footer from "../Footer/Footer"

export default function Game() {
    return (
        <div id="game-div" /*ref={el => (this.div = el)}*/>
            <p>
            {/* Game ! */}
            </p>
            <canvas id="currentGame">
            </canvas>
            <Footer />
        </div>
    )
}