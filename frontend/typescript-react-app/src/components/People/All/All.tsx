import './All.scss';
import React, {Component, useState, useEffect} from "react";
import myAxios from "../../Utils/Axios/Axios";
import axios from "axios";
import MiniDisplay from '../MiniDisplay/MiniDisplay';

export default function All() {
	//TODO: attention a trouver quelque chose pour faire "une pause" tant que toutes les requetes n'ont pas été faites
	const [users, setUsers] = React.useState([]);
    const [count, setCount] = useState(0);

	//Récupération de tous les users et de leur statut
	//TODO: faire un check pour savoir s'ils sont amis ?
    function renderUsers()
    {
        axios.defaults.withCredentials = true;
        /* */
        let url = "http://localhost:3000/api/user/";
        axios.get(url)
        .then( res => {
            console.log("Get api chat successfully called.");
            let users = res.data;
            //console.log(users);
			let len = users.length;
			//setUsers(users.login);
			console.log(users);
			console.log(len);
			let i = 0;
			while (i < len)
			{
				console.log(users[i]);
				setUsers(prevArray => [...prevArray, users[i]])
				i++;
			}
        })
        .catch((error) => {
            console.log("Error while getting all users");
        })
    }

	//Attention mon use effect est pas bon il recharge parfois des user
    useEffect(() => {
        renderUsers();
    }, []);

    return (
        <div id="people--div">
            <div className="container" id="container--all">
				<h1 className="text" id="displaying">USERS</h1>
				<br/>
				<div className="row" id="row--users">
				<div id="ul--list" className="row">
					<h2 id="registered--title">List of all registered users</h2>
					<ul id="list--users--ul" className="list-group list-group-horizontal-lg">
						{users.map(user  =>
							//<li key={user}>{user}</li>
							<MiniDisplay key={user.login} login={user.login} status={user.status}/>
							//TODO: grace au user je peux creer un petit composant avec toutes les infos
							//console.log(user);
						)}
					</ul>
				</div>
				</div>
				<br/>
			</div>
        </div>
    );
}
