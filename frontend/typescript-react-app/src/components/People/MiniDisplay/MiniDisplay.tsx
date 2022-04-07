import './MiniDisplay.scss';
import axios from 'axios';
import MyAxios from '../../Utils/Axios/Axios';
import React, { Component, useState} from 'react';

interface MiniDisplayProps {
	login?: string,
	status?: string,
	avatar?: string
}

/**
 * @malatini
 */
export default function MiniDisplay(props: MiniDisplayProps) {
    return (
		<div id="minidisplay--container">
			<li id="minidisplay--div" className="list-group-item">
				<div /*className="row d-flex justify-content-center text-center"*/>
					{renderImage(props.login)}
					<br />
					<span id="mini--login">{props.login}</span>
					<br/>
					<span id="mini--status">{props.status}</span>
					<br />
					<a href="" className="profile--link">Go to profile</a>
					<br />
				</div>

			</li>
		</div>
    );
}

function renderImage(login: string) {
	let ax = new MyAxios(null);
	console.log("login is " + login);
	return (ax.render_avatar(login));
}
