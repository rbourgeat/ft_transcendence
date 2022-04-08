import './MiniDisplay.scss';
import axios from 'axios';
import MyAxios from '../../Utils/Axios/Axios';
import React, { Component, useState, useEffect, useRef} from 'react';

export interface MiniDisplayProps {
	login?: string,
	status?: string,
	avatar?: string
	//wrapperStyle?: React.CSSProperties;
	//children?: JSX.Element|JSX.Element[];
	//children?: React.ReactNode

	children?: React.ReactNode | React.ReactChild | React.ReactChildren | React.ReactChild[] | React.ReactChildren[]
}

export default function MiniDisplay(props: MiniDisplayProps) {
	const [load, setLoad] = React.useState(false);
	const calledOnce = React.useRef(false);

	function renderImage(avatar: string)
	{
		if (!avatar)
			return ;

		let imageName = "alt-photo";

		if (avatar.startsWith("http"))
		{
			//console.log('should display 42');
			let imageUser42 = "https://cdn.intra.42.fr/users/".concat(props.login).concat(".jpg");
			var myImg = document.getElementById(props.login) as HTMLImageElement;
			if (imageUser42)
				myImg.src = imageUser42;
			else
				myImg.src = avatar;;
			return ;
		}

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
        })

	}

	useEffect(() => {
		if (calledOnce.current) {
			return;}
		setLoad(true);
		calledOnce.current = true;
	}, []);

	//let inputEl = useRef();

    return (
		//<div id="minidisplay--container">
		<>
			<li id="minidisplay--div" className="list-group-item" key={props.login}>
				{/*<div id="minidisplay--container">*/}
					<img className="profile--pic" id={props.login} src="" width="80" height="80"/>
					{load == true ? renderImage(props.avatar) : console.log("test")}
					<br />
					{/*{load == true ? renderImage(props.avatar) : console.log("image not loaded")}*/}
					<p className="user--p" id="mini--login">{props.login}</p>
					<p className="user--p" id="mini--status">{props.status}</p>
					<a href="" className="profile--link">Profile [to do]</a>
				{/*</div>*/}
			</li>
		</>
    );
}


