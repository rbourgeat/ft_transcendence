import './All.scss';
import React, {Component, useState, useEffect} from "react";
import myAxios from "../../Utils/Axios/Axios";
import axios from "axios";
import MiniDisplay from '../MiniDisplay/MiniDisplay';
import Invitations from "../Invitations/Invitations";
import Blocked from "../Blocked/Blocked";
import Friends from "../Friends/Friends";

export default function All() {
	//TODO: attention a trouver quelque chose pour faire "une pause" tant que toutes les requetes n'ont pas été faites
	const [users, setUsers] = React.useState([]);
	const [load, setLoad] = React.useState(false);
	//let usersTab = [];
    const [count, setCount] = useState(0);

	const calledOnce = React.useRef(false);

	//Récupération de tous les users et de leur statut
	//TODO: faire un check pour savoir s'ils sont amis ?
    async function renderUsers()
    {
        axios.defaults.withCredentials = true;
        let url = "http://localhost:3000/api/user/";
        await axios.get(url)
        .then( res => {
            console.log("Get api users successfully called.");
            let users = res.data;
			let len = users.length;
			let i = 0;
			while (i < len)
			{
				//usersTab.push(users[i]);
				setUsers(prevArray => [...prevArray, users[i]])
				//setTheArray([...theArray, `Entry ${theArray.length}`]);
				//users.push(users[i]);
				i++;
			}
			//console.log("users is " + usersTab);
        })
        .catch((error) => {
            console.log("Error while getting all users");
        })
		setLoad(true);
    }

    useEffect(() => {
		if (calledOnce.current) {
			return;}
        renderUsers();
		calledOnce.current = true;
    }, []);

	//function mapUsers()
	//{
	//	if (load == true)
	//	{
	//		return (users.map(users  => {
	//			<MiniDisplay key={users.login} login={users.login} status={users.status} avatar={users.avatar} />;
	//		}))
	//	}
	//}

    return (
			<div id="people--div">
				<div className="container" id="container--all">
					<br/>
					<div className="row" id="row--users">
					<div id="ul--list" className="row">
						<h2 id="registered--title">List of all registered users</h2>
						<ul id="list--users--ul" className="list-group list-group-horizontal-lg">
							{load == true ? console.log("Mapping") : ""}
							{/*{mapUsers()}*/}
							{load == true ? users.map(user => <MiniDisplay key={user.login} login={user.login} status={user.status} avatar={user.avatar} />) : ""}
							{/*{load == true ? <MiniDisplay key={users[0].login} login={users[0].login} status={users[0].status} avatar={users[0].avatar} /> : ""}*/}
							{/*{load == true ? <MiniDisplay key={users[1].login} login={users[1].login} status={users[1].status} avatar={users[1].avatar} /> : ""}*/}
						</ul>
					</div>
					</div>
					<Friends />
					<Invitations />
					<Blocked />
				</div>
			</div>
			);
}
