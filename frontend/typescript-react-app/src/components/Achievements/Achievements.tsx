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
                                <h1 id="achievements--title">Achievements [deprecated]</h1>
                            </div>
                            {/* TODO: checker si les achivements ont ete atteint ou pas */}
                                        <div className="row" id="first-row">
                                            <div className="card-group" id="group--one">
                                                <div className="card" >
                                                    <div className="card-body">
                                                        <h5 className="card-title">The challender</h5>
                                                        <p className="card-text">Reached the first position</p>
                                                        {/* Attention ce CDN a l air buggy */}
                                                        <img className="achievements--img" src="https://cdn.icon-icons.com/icons2/2534/PNG/512/trophy_winner_icon_152036.png" height="20px"></img>
                                                    </div>
                                                </div>

                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">On fire</h5>
                                                        <p className="card-text">Win 5 games in a row</p>
                                                        <img className="achievements--img" src="https://icon-library.com/images/fire-icon/fire-icon-22.jpg" height="20px"></img>
                                                    </div>
                                                </div>

                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">Finally i'm a g4m3r</h5>
                                                        <p className="card-text">Play more than a 1000 games</p>
                                                        <img src="https://www.iconpacks.net/icons/1/free-keyboard-icon-1405-thumb.png" className="achievements--img" height="20px"></img>
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
                                                        <img src="https://static.thenounproject.com/png/355154-200.png" className="achievements--img" height="20px"></img>
                                                    </div>
                                                </div>

                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">I am not noob</h5>
                                                        <p className="card-text">Launch your first game</p>
                                                        <img src="https://icons-for-free.com/iconfiles/png/512/off+power+reboot+restart+icon-1320086062721850594.png" className="achievements--img" height="20px"></img>
                                                    </div>
                                                </div>

                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">Stand together</h5>
                                                        <p className="card-text">Create or join guild</p>
                                                        <img src="https://simpleicon.com/wp-content/uploads/flag.png" className="achievements--img" height="20px"></img>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/*<div className="row" id="third-row">
                                            <div className="card-group">
                                                <div className="card">
                                                    <div className="card-body-disabled">
                                                        <h5 className="card-title">Oh boy, you look good</h5>
                                                        <p className="card-text">Upload your own avatar</p>
                                                        <img src="https://cdn3.iconfinder.com/data/icons/glypho-travel/64/history-swords-crossed-512.png" className="achievements--img" height="20px"></img>
                                                    </div>
                                                </div>

                                                <div className="card">
                                                    <div className="card-body-disabled">
                                                        <h5 className="card-title">???</h5>
                                                        <p className="card-text">42 could the answer</p>
                                                        <img src="https://cdn.onlinewebfonts.com/svg/img_183371.png" className="achievements--img" height="20px"></img>
                                                    </div>
                                                </div>

                                                <div className="card">
                                                    <div className="card-body-disabled">
                                                        <h5 className="card-title">I want you to hit me</h5>
                                                        <p className="card-text">Invite 10 people to a duel</p>
                                                        <img src="https://icon-library.com/images/punch-icon/punch-icon-25.jpg" className="achievements--img" height="20px"></img>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>*/}

                                    </div>
                            </div>
            <Footer />
            </div>
        );
    }

}
