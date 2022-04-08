import './MiniDisplay.scss';
import axios from 'axios';
import MyAxios from '../../Utils/Axios/Axios';
import React, { Component, useState, useEffect, useRef} from 'react';

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

		if (avatar.startsWith("https://cdn.intra.42.fr"))
		{
			console.log('should display 42');
			let imageUser42 = "https://cdn.intra.42.fr/users/".concat(props.login).concat(".jpg");
            //let myImage: HTMLImageElement = document.querySelector("#".concat(props.login));
			//var objectURL = avatar;
            //myImage.src = objectURL;
			var myImg = document.getElementById(props.login) as HTMLImageElement;
			if (imageUser42)
				myImg.src = imageUser42;
			else
				myImg.src = avatar;
			console.log("Image.src is " + myImg.src);
			return ;

            //return (<img src={myImage.src} alt={imageName} id={props.login} height="80"/>);
		}
       // if (avatar == null)
            //ret = <img src="https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg" alt={imageName} height="80" width="80" id="avatar-id"/>;
		//		return (<img src="https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg" alt={imageName} height="80" width="80" id="avatar-id"/>);

        let url = "http://localhost:3000/api/user/".concat(avatar).concat("/avatar/");
        //console.log(url);
        let res = axios.get(url, {responseType: 'blob'})
        .then(res => {
            let myImage: HTMLImageElement = document.querySelector("#".concat(props.login));
			var objectURL = URL.createObjectURL(res.data);
			myImage.src = objectURL;
			return (<img src={myImage.src} alt={imageName} id={props.login} height="80" />);
        })
        .catch ((error) => {
            console.log("Catched error during get/fileId/avatar");
            //console.log(error);
        })

	}

	useEffect(() => {
		setLoad(true);
	}, []);

	let inputEl = useRef();

    return (
		<div id="minidisplay--container">
			<li id="minidisplay--div" className="list-group-item">
				<div /*className="row d-flex justify-content-center text-center"*/>
					<img id={props.login} src="" width="80" height="80"/>
					<br />
					<span> {load == true ? renderImage(props.avatar) : ""}</span>
					<br />
					<span id="mini--login">{props.login}</span>
					<br />
					<span id="mini--status">{props.status}</span>
					<br />
					<a href="" className="profile--link">Go to profile</a>
					<br />
				</div>
			</li>
		</div>
    );
}


