import React, {useState, useEffect, useRef, useContext} from 'react';
import './Profile.scss';
import axios from "axios";
import Nav from "../Nav/Nav";
import { useParams } from 'react-router-dom'
import NotFound from "../../components/NotFound/NotFound";

//export interface ProfileProps {
//	login?: string,
//	//children?: React.ReactNode | React.ReactChild | React.ReactChildren | React.ReactChild[] | React.ReactChildren[]
//}

export default function Profile() {

	const calledOnce = React.useRef(false);
	const [userOK, setUserOk] = React.useState(false);
	//const loginPram =  useState(params.username)

	function getUserLogin(log: string) {
		//let url = "http://localhost:3000/api/auth/";

		console.log("Login is " + log);

		let url = "http://localhost:3000/api/user/".concat(login);


		axios.get(url)
		.then(res => {
			console.log(res);
			setUserOk(true);
		})
		.catch((err) => {
			console.log("Error while getting api auth");
			console.log(err);
		})
	}

	useEffect(() => {
	if (calledOnce.current) {
		return;}
	//getUserLogin({login});
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

						{getUserLogin(login)}
						{userOK == true ?
							<h2 id="profile-title">{login}'s profile</h2>
						: <>
							<h1><span id="oops">Oops...</span></h1>
							<h2><span id="page-not-found">Page not found</span></h2>
							<button type="button" className="btn btn-outline-dark"
								onClick={(e) => {window.top.location = "http://localhost:3030/game"}}
							>Go to game</button>
						</>
						}
					</div>
				</div>
			</div>
				{/*<p id="profile--p">
					Profile page
				</p>*/}
        </div>
    )
}
