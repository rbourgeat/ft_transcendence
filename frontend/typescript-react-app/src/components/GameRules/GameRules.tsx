import './GameRules.scss';
import Nav from "../Nav/Nav";

{/* Regles reprise au groupe de mli, on peut modifier ou ajouter des "bonus" */}
export default function GameRules() {
    return (
		<>
			<div id="game-rules" className="container">
				<div className="row">
					<div className="row d-flex justify-content-justify text-justify">
						{/*<h1 id="game--rules" className="game--rules--title">Game rules</h1>*/}
						<h1 className="game--rules--title">Presentation</h1>
						<p>This is a classical Pong game :</p>
						<br />
							<p>If the ball hits the top, the bottom, or players' paddles, it bounces.</p>
							<p>If the ball reaches the right or the left edge, the opposite player scores a point.</p>
							<br />
							<p>The game ends when a player has 7 (seven) points.</p>
							<p>The match becomes visible on each players' profiles and their elos are updated.</p>
						<h2 className="game--rules--title">Match making</h2>
						<p>It is a system that matches users who wants to play at the same moment.</p>
						<p>The map is always the same as the good old pong.</p>
						<p>Power-ups are disabled.</p>
						<h2 className="game--rules--title">Watch mode</h2>
						<p>
							Private games are rooms where you can invite someone to play with you.</p>
							<p>Players can select power-ups, and choose the map.</p>
						<h2 className="game--rules--title">Modes: power-ups</h2>
						<p>
							What we call power-ups, are temporary game changers.</p>
							<p>They are represented as small bubbles.</p>
							<p>They are bonuses (or penalties) for the last player that touched the ball.</p>
							<p>All power-ups modifications are reset when someone scores.</p>
							<br />
							<p>There are 4 types of power-ups :</p>
							<p>- Ball size up: Increase the ball size by 75%.</p>
							<p>- Ball size down: Decrease the ball size by 75%.</p>
							<p>- Bar length up: Add 75% to the bar length.</p>
							<p>- Bar speed up: Add 75% to the bar speed.</p>
							<br/>
							<p>Power-ups can spawn randomly each time the ball hits a paddle.</p>
							<p>Power-ups are disabled in match-making games.</p>
					</div>
				</div>
			</div>
		</>
    );
}
