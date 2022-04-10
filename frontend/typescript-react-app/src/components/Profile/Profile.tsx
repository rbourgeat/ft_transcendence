import React, {useState, useEffect, useRef, useContext} from 'react';
import './Profile.scss';
import axios from "axios";
import Nav from "../Nav/Nav";
import { useParams } from 'react-router-dom'

//export interface ProfileProps {
//	login?: string,
//	//children?: React.ReactNode | React.ReactChild | React.ReactChildren | React.ReactChild[] | React.ReactChildren[]
//}

export default function Profile() {

	const calledOnce = React.useRef(false);
	const [userOK, setUserOk] = React.useState(false);
	//const loginPram =  useState(params.username)

	async function getUser() {
		//let url = "http://localhost:3000/api/auth/";

		//let username = "";
		//await axios.get(url)
		//	.then(res => {
		//		username = res.data.login;
		//		console.log(res);
		//		setUserOk(true);
		//	})
		//	.catch((err) => {
		//		console.log("Error while getting api auth");
		//		console.log(err);
		//	})
	}

	useEffect(() => {
	if (calledOnce.current) {
		return;}
	//getUser();
	calledOnce.current = true;
}, []);

	const {login} = useParams();
	console.log("Param Login is " + {login});
	console.log("Param Login is " + login);

    return (
        <div id="profile--div">
			<Nav />
			<div className="container">
				<div className="row d-flex justify-content-center text-center">
					<br />
					<div className="col-9 mx-auto text-center">
						<br />
						<h2 id="profile-title">Profile of {login}</h2>
					</div>
				</div>
			</div>
				{/*<p id="profile--p">
					Profile page
				</p>*/}
        </div>
    )
}
