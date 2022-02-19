import React from 'react';
import './Game.scss';
import Footer from "../Footer/Footer"

// // import { useNavigate } from "react-router-dom";


export default function Game() {
    // const script = document.createElement("script");
    // script.async = true;
    // script.src = "game.js";
    // this.div.appendChild(script);
    return (
        <div /*id="game-div" ref={el => (this.div = el)}*/>
            <p>
            {/* Game ! */}
            </p>
            <canvas id="currentGame">
            </canvas>
             {/* <script src="./game.js"></script> */}
            <Footer />
        </div>
    )
}