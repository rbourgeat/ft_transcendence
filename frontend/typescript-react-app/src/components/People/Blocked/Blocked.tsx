import './Blocked.scss';
import React, {Component, useState, useEffect} from "react";
import myAxios from "../../Utils/Axios/Axios";
import axios from "axios";

export default function Blocked() {
	const [blocked, setBlocked] = React.useState([]);
    const [count, setCount] = useState(0);

	const calledOnce = React.useRef(false);

    function renderBlocked()
    {
        axios.defaults.withCredentials = true;
    }

	//Attention mon use effect est pas bon il recharge parfois des user
    useEffect(() => {
		if (calledOnce.current) {
			return;}
        renderBlocked();
    }, []);

    return (
		<div id="blocked-div">
			<div id="container--invitations">
				<h1 className="text" id="displaying">Blocked</h1>
				<br />
				<div className="row" id="row--users">
				</div>
			</div>
		</div>
		);
}
