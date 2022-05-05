import './ListChannels.scss';
import React, { useEffect } from "react";
import axios from "axios";
import DisplayChan from './DisplayChan/DisplayChan';
import CreateChan from '../CreateChan/CreateChan';
import CreateDM from "../CreateChan/CreateDM";
import JoinChan from '../CreateChan/JoinPubChan';

export interface ListChannelsProps {
	setHasPass?: any,
	login: string,
	setIsChan?: any,
	isChan?: boolean,
	minIdDM?: any,
	setActiveID?: any,
	setActiveName?: any,
	activeName?: string,
	socket?: any,
	setHide?: any,
	setIsBanned?: any
}

export default function ListChannels(props: ListChannelsProps) {
	const [channels, setChannels] = React.useState([]);

	//Affichage sélection DM ou channels
	const [load, setLoad] = React.useState(false);
	const [exited, setExited] = React.useState("false");
	const [update, setUpdate] = React.useState("");

	function renderListChannels() {

		axios.defaults.withCredentials = true;
		let url = "";
		if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
			url = "http://localhost:3000/api/chat/joinedChannels";
		else
			url = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/chat/joinedChannels");
		axios.get(url)
			.then(res => {
				let channels = res.data;
				let len = channels.length;
				let i = 0;
				while (i < len) {
					if (channels[i].direct === false) {
						setChannels(prevArray => [...prevArray, channels[i]]);
					}
					else if (channels[i].direct === true) {
						setChannels(prevArray => [...prevArray, channels[i]]);
					}
					i++;
				}
				setLoad(true);
			})
			.catch((error) => {
				;
			})
	}

	//nécessaire pour mettre à jour suite à la fermeture d'un modal
	useEffect(() => {
		clean();
		renderListChannels();
	}, [exited])

	function clean() {
		let chans = Array.from(document.getElementsByClassName("displaying_channels"));
		for (let i = 0; i <= chans.length; i++) {
			chans.pop();
			channels.pop();
		}
		setChannels([]);
		chans = null;
	}

	return (
		<div id="listChannels" className="col-md-3" >
			<div id="channel--col">
				<div className="title--channel--col">
					<p className="channels-title">Channels</p>
				</div>
				{load == true ?
					<div className="add-channel-a">
						<CreateChan setExited={setExited} setUpdate={setUpdate} exited={exited} setHasPass={props.setHasPass} />
						<CreateDM setExited={setExited} setUpdate={setUpdate} exited={exited} />
						<JoinChan socket={props.socket} setExited={setExited} setUpdate={setUpdate} exited={exited} login={props.login} />
					</div>
					: ""}

				<div className="displaying-div">
					{load === true ?
						channels.map(channel => {
							if (channel.id !== undefined) {
								return (
									<div key={channel.id} className="displaying_channels">
										<DisplayChan
											setIsChan={props.setIsChan}
											isChan={props.isChan}
											channel={channel}
											login={props.login}
											setHasPass={props.setHasPass}
											setActiveID={props.setActiveID}
											setActiveName={props.setActiveName}
											setHide={props.setHide}
											socket={props.socket}
											update={update}
											activeName={props.activeName}
											direct={channel.direct}
										/>
									</div>
								)
							}
						})
						: null}
				</div>
			</div>
		</div>
	);
}
