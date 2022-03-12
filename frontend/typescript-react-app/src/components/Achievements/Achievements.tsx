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
                                                        <img id="trophee" src="https://cdn.icon-icons.com/icons2/2534/PNG/512/trophy_winner_icon_152036.png" height="25px"></img>
                                                    </div>
                                                 </div>

                                            {/* Deuxieme */}
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">On fire</h5>
                                                        <p className="card-text">Win 5 games in a row</p>
                                                        <img src=""></img>
                                                    </div>
                                                </div>

                                                {/* Troisieme */}
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">Finally i'm a g4m3r</h5>
                                                        <p className="card-text">Play more than a 1000 games</p>
                                                        <img src=""></img>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                            
                                        <div className="row" id="second-row">
                                            <div className="card-group">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">This is how I met...</h5>
                                                        <p className="card-text">Had someone as your friend</p>
                                                        <img src=""></img>
                                                    </div>
                                                </div>

                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">I am not noob</h5>
                                                        <p className="card-text">Launch your first game</p>
                                                        <img src=""></img>
                                                    </div>
                                                </div>
                                                

                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">Stand together</h5>
                                                        <p className="card-text">Create or join guild</p>
                                                        <img src=""></img>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row" id="third-row">
                                            <div className="card-group">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">Oh boy, you look good</h5>
                                                        <p className="card-text">Upload your own avatar</p>
                                                    </div>
                                                </div>

                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">???</h5>
                                                        <p className="card-text">42 could the answer</p>
                                                        <img src=""></img>
                                                    </div>
                                                </div>
                                                

                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">I want you to hit me</h5>
                                                        <p className="card-text">Invite 10 people to a duel</p>
                                                        <img src=""></img>
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
