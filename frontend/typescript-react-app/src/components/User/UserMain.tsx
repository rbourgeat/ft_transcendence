import React  from 'react';
import Usersub from "./UserSub"
import Header from "../Header/Header";

export interface UserMainProps
{
	username?: string,
	email?: string,
	password?: string,
	password_conf?: string,
	avatar?: string,
	totalGames?: number,
	totalWins?: number,
	totalLoss?: number,
	winLoss?: number
}

// export interface UserMainState
// {
// }

export default function UserMain(props: UserMainProps)
{
	return (
		<div>
			{/* transmettre ses props au sous composant */}
			<Usersub/>
		</div>
	);
}
