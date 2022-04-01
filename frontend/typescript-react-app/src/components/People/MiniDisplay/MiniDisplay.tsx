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
			<p className="text">login</p>
			<p className="text">rank</p>
			<p className="text">Status</p>
        </li>
    );
}

function renderImage(login: string) {
	let ax = new MyAxios(null);
	return (ax.render_avatar(login));
}
