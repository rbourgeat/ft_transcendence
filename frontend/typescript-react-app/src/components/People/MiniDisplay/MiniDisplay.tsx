import './MiniDisplay.scss';
import axios from 'axios';
import MyAxios from '../../Utils/Axios/Axios';
import React, { Component, useState} from 'react';

interface MiniDisplayProps {
	login?: string
}

/**
 * @malatini
 */
export default function MiniDisplay(props: MiniDisplayProps) {
    return (
        <li id="minidisplay--div" className="list-group-item">
			{renderImage(props.login)}
			<div className="row d-flex justify-content-center text-center">
				<span id="mini--login">login</span>
				<span id="mini--status">Status</span>
			</div>
        </li>
    );
}

function renderImage(login: string) {
	let ax = new MyAxios(null);
	return (ax.render_avatar(login));
}
