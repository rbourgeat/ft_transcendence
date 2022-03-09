import './Achievements.scss';
import React from "react";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";


export interface AchievementsProps{

}

export interface AchievementsState {

}

export default class Achievements extends React.Component<AchievementsProps, AchievementsState>
{
    constructor(props: AchievementsProps)
    {
        super(props);

        this.state = {}
    }

    componentDidMount() {}

    render()
    {
        return (
            <div id="Leaderboard">
				<Nav />
					<div id="achievements">
						<div className="container">
							<div className="row d-flex justify-content-center text-center">
								<div className="col-7">
									<h1>Achievements</h1>
								</div>
							</div>
						</div>
					</div>
            	<Footer />
            </div>
        );
    }

}
