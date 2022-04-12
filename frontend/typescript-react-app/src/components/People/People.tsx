import './People.scss';
import Nav from '../Nav/Nav';
import Footer from "../Footer/Footer";
import All from "./All/All";
import Invitations from "./Invitations/Invitations";
import Friends from "./Friends/Friends";
import Blocked from "./Blocked/Blocked";

export default function People() {
	return (
		<div id="people--div">
			<Nav />
			<div id="all">
				<div className="row">
					<br />
					<All />
					<br />
					<Friends />
					<br />
					{/*<Invitations />*/}
					<br />
					{/*<Blocked />*/}
				</div>
			</div>
		</div>
	);
}
