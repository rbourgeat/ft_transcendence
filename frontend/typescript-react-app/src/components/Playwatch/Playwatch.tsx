import {useState,  useEffect, useLayoutEffect } from 'react';
import './PlayWatch.scss';
import ReactDOM from 'react-dom';
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

export default function PlayWatch() {
    return (
        <div id="play--watch">
            <Nav />
            <div className="container">
				<div className="row d-flex justify-content-center text-center">
					<h1 className="text">Play Mode / Watch Mode</h1>
					<h2 className="text">@malatini</h2>
				</div>
            </div>
            <Footer />
        </div>
    );
}
