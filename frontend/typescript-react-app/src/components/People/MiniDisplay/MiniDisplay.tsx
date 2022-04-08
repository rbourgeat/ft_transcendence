import './MiniDisplay.scss';
import axios from 'axios';
import MyAxios from '../../Utils/Axios/Axios';
import React, { Component, useState, useEffect, useRef} from 'react';
// IMPORTER CA 
import io from "socket.io-client";

interface MiniDisplayProps {
	login?: string,
	status?: string,
	avatar?: string
}

/**
 * @malatini
 */
export default function MiniDisplay(props: MiniDisplayProps) {
	const [load, setLoad] = React.useState(false);

	function renderImage(avatar: string)
	{
		if (!avatar)
			return ;
		//console.log("avatar is " + avatar);

		let imageName = "alt-photo";
      	//console.log("imageCode is " + avatar);

		if (avatar.startsWith("http"))
		{
			//console.log('should display 42');
			let imageUser42 = "https://cdn.intra.42.fr/users/".concat(props.login).concat(".jpg");
			var myImg = document.getElementById(props.login) as HTMLImageElement;
			if (imageUser42)
				myImg.src = imageUser42;
			else
				myImg.src = avatar;
			//console.log("Image.src is " + myImg.src);
			return ;
		}
		//else
		//	return (<img src="https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg" alt={imageName} height="80" width="80" id={props.login}/>);

        let url = "http://localhost:3000/api/user/".concat(avatar).concat("/avatar/");
        //console.log(url);
        let res = axios.get(url, {responseType: 'blob'})
        .then(res => {
            let myImage: HTMLImageElement = document.querySelector("#".concat(props.login));
			var objectURL = URL.createObjectURL(res.data);
			myImage.src = objectURL;
			return (<img className="profile--pic" src={myImage.src} alt={imageName} id={props.login} height="80" />);
        })
        .catch ((error) => {
            console.log("Catched error during get/fileId/avatar");
			return (<img className="profile--pic" src="https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg" alt={imageName} height="80" width="80" id={props.login}/>);
            //console.log(error);
        })

	}

	// REPRENDRE USER ICI
	const [username, setUsername] = React.useState("");
	async function getUser() {
        let url = "http://localhost:3000/api/auth/";
        let username = "";
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;
        await axios.get(url)
            .then(res => {
                username = res.data.login;
                console.log(username + ' <-- result of get user')
            })
            .catch((err) => {
                console.log("Error while getting api auth");
            })
    }

	useEffect(() => {
		getUser();
		setLoad(true);
		
	}, []);

	// LA SOCKET ICI
	let socket = io("http://localhost:3000/chat", { query: { username: username } });
	const [status, setStatus] = React.useState(props.status);
	socket.on("updateStatus", (pseudo, statusUpdated) => {
        if (pseudo) {
            console.log("name: " + pseudo + " / " + "status: " + statusUpdated);
			setStatus(statusUpdated);
        }
    });

	let inputEl = useRef();

    return (
		<div id="minidisplay--container">
			<li id="minidisplay--div" className="list-group-item">
				<div /*className="row d-flex justify-content-center text-center"*/>
					<img className="profile--pic" id={props.login} src="" width="80" height="80"/>
					<br />
					<span> {load == true ? renderImage(props.avatar) : ""}</span>
					<p className="user--p" id="mini--login">{props.login}</p>
					<p className="user--p" id="mini--status">{status}</p>
					<a href="" className="profile--link">Profile [to do]</a>
				</div>
			</li>
		</div>
    );
}


