import React from 'react';
import './Welcome.scss';
import '../App/App.scss';
import '../../index.scss';

import Footer from "../Footer/Footer"
import Header from "../Header/Header"

// import { useNavigate } from "react-router-dom";
//TODO: a ranger dans Pages
export default function Welcome() {
    return (
        <div id="welcome">
            Welcome page
            <Footer />
        </div>
        
    )
}