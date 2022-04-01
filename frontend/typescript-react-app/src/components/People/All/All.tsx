import './All.scss';
import React, {Component, useState, useEffect} from "react";
import myAxios from "../../Utils/Axios/Axios";
import axios from "axios";

export default function All() {
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
			/**/
			console.log(len);
			let i = 0;
			while (i < len)
			{
				console.log(users[i].login);
				setUsers(prevArray => [...prevArray, users[i].login])
				i++;
			}
        })
        .catch((error) => {
            console.log("Error while getting all users");
        })
    }

    useEffect(() => {
        renderUsers();
    }, []);

    return (
        <div id="people--div">
            <div className="container" id="container--all">
				<h1 className="text" id="displaying">USERS</h1>
				<br/>
				<ul id="list--users--ul">
                    {users.map(user  =>
						<li key={user}>{user}</li>
						//console.log(user);
					)}
                </ul>
			</div>
        </div>
    );
}
