import React, { Component, useState} from 'react';
import Nav from "../Nav/Nav";
import './Stats.scss';
import axios from 'axios';
import MyAxios from '../Utils/Axios/Axios';
import { ToastContainer, toast } from 'react-toastify';
//import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import Dashboard from '../Dashboard/Dashboard';

export default function Stats(props)
{
	//TODO: a reprendre (attention a déjà un debut avec DashBoard et Match History)

    return (
		<div id="user--div">
		<Nav />
			<div className="container">
				<div className="row d-flex justify-content-center text-center">
					<h1 id="stats-title">My stats</h1>
					<h2 id="to-do">to do @macrespo : <br />reprendre match history,<br /> badge et autres</h2>
					<Dashboard />
				</div>
			</div>
		</div>
    );
};
