import React  from 'react';
import Usersub from "./UserSub"
import Header from "../Header/Header";

export default function UserMain()
{
	return (
		<div>
			{/*<Header />*/}
			<Usersub username="yaya" email="yaya@gmail.com" password="Babyalex2016" password_conf="Babyalex2016" />
		</div>
	);
}
