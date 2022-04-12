import './People.scss';
import Nav from '../Nav/Nav';
import Footer from "../Footer/Footer";
import All from "./All/All";
import Invitations from "./Invitations/Invitations";
import Friends from "./Friends/Friends";
import Blocked from "./Blocked/Blocked";

export interface PeopleProps {
	login?: string
}

export default function People(props: PeopleProps) {

	function update() {
		window.top.location = "/people/";
	}

	return (
		<div id="people--div">
			<Nav />
			<button onClick={update}>update</button>
			<div id="all">
				<div className="row">
					<br />
					<All login={props.login} />
					<br />
					<Friends />
					<br />
					<Invitations />
					<br />
					<Blocked />
				</div>
			</div>
		</div>
	);
}
