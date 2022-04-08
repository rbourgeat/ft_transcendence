import React, { Component, useState} from 'react';
import Nav from "../Nav/Nav";
import './Stats.scss';
import axios from 'axios';
import MyAxios from '../Utils/Axios/Axios';
import { ToastContainer, toast } from 'react-toastify';
import Dashboard from '../Dashboard/Dashboard';

export default function Stats(props)
{
    return (
		<div id="user--div">
		<Nav />
			<div className="container">
				<div className="row d-flex justify-content-center text-center">
					<h1 id="stats-title">My stats</h1>
					{/*<h2 id="to-do">to do @malatini : <br />reprendre match history,<br /> badge et autres</h2>*/}
					<Dashboard />
				</div>
			</div>
		</div>
    );
};
