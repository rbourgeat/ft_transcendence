import './MiniDisplay.scss';
import axios from 'axios';
import MyAxios from '../../Utils/Axios/Axios';
import React, { Component, useState, useEffect} from 'react';

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
		console.log("here");
		if (!avatar)
			return ;
		let ax = new MyAxios(null);
		console.log("avatar is " + avatar);
		let ret: any;

		let imageName = "alt-photo";
        console.log("imageCode is " + avatar);
        if (avatar == null)
            //ret = <img src="https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg" alt={imageName} height="80" width="80" id="avatar-id"/>;
			return (<img src="https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg" alt={imageName} height="80" width="80" id="avatar-id"/>);

        let url = "http://localhost:3000/api/user/".concat(avatar).concat("/avatar/");
        console.log(url);
       // console.log("The url is " + url);
        let res = axios.get(url, {responseType: 'blob'})
        .then(res => {
            let myImage = document.querySelector('img');
            var objectURL = URL.createObjectURL(res.data);
            myImage.src = objectURL;
            //console.log("the image src is " + myImage.src);
			//ret = <img src={myImage.src} alt={imageName} height="80" width="80" />
			return (<img src={myImage.src} alt={imageName} height="80" width="80" />);

        })
        .catch ((error) => {
            console.log("Catched error during get/fileId/avatar");
            console.log(error);
        })

	}

	useEffect(() => {
		setLoad(true);
	}, []);

    return (
		<div id="minidisplay--container">
			<li id="minidisplay--div" className="list-group-item">
				<div /*className="row d-flex justify-content-center text-center"*/>
					<img height="80"/>
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


