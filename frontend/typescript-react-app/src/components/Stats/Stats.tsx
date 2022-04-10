import React, { Component, useState, useEffect } from 'react';
import Nav from "../Nav/Nav";
import './Stats.scss';
import axios from 'axios';
import MyAxios from '../Utils/Axios/Axios';

import Dashboard from '../Dashboard/Dashboard';

export interface StatProps {
	login?: string,
	children?: React.ReactNode | React.ReactChild | React.ReactChildren | React.ReactChild[] | React.ReactChildren[]
}

export default function Stats(props: StatProps) {
	useEffect(() => {
	}, []);

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
