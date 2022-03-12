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
							<div className="row d-flex justify-content-center text-center" id="row-cards">
                                <h1>Achievements</h1>
                            </div>
                                        <div className="row" id="first-row">
                                        <div className="card-group">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">The challender</h5>
                                                    <p className="card-text">Reach the first position in the ladder</p>
                                                </div>
                                            </div>

                                            {/* Deuxieme */}
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">The challender</h5>
                                                    <p className="card-text">Reach the first position in the ladder</p>
                                                </div>
                                            </div>

                                            {/* Troisieme */}
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">The challender</h5>
                                                    <p className="card-text">Reach the first position in the ladder</p>
                                                </div>
                                            </div>
                                            

                                        <div className="row" id="second-row">
                                            <div className="card-group"></div>
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">The challender</h5>
                                                        <p className="card-text">Reach the first position in the ladder</p>
                                                    </div>
                                                </div>

                                                <div className="card-group"></div>
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">The challender</h5>
                                                        <p className="card-text">Reach the first position in the ladder</p>
                                                    </div>
                                                </div>

                                                <div className="card-group"></div>
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">The challender</h5>
                                                        <p className="card-text">Reach the first position in the ladder</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
            	<Footer />
            </div>
        );
    }

}
