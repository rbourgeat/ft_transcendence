import './DisplayChan.scss';
import React, { useEffect } from 'react';


export interface DisplayChanProps {
	channel?: any;
	isChan?: boolean,
	minId?: any,
	login: string,
	setHasPass?: any,
	setActiveID?: any,
	setActiveName?: any
	receiver?: string,
	setHide?: any
	socket?: any
}

export default function DisplayChan(props: DisplayChanProps) {

	const calledOnce = React.useRef(false);
	const [isSelected, setIsSelected] = React.useState("false");
	const [load, setLoad] = React.useState(false);
	const [receiver, setReceiver] = React.useState("");

	useEffect(() => {
		setLoad(true);

		if (props.isChan === false) {
			console.log("i am: " + props.login);
			let rec;

			if (props.channel.participates[0].login == props.login)
				rec = props.channel.participates[1].login;
			else
				rec = props.channel.participates[0].login;
			props.setActiveName(receiver);
		}

/*
		console.log("enter in display chan with:" + props.channel[1].name)
		if (calledOnce.current) {
			return;
		}


		if (props.channel) {
			let rec;

			if (props.channel.participates[0].login == props.login || props.channel.participates[0].login === props.login)
				rec = props.channel.participates[1].login;
			else
				rec = props.channel.participates[0].login;
			setReceiver(rec);
		}

		if (calledOnce.current !== true && props.channel.id === props.minId) {
			setIsSelected("true");
			if (props.isChan === false) {
				props.setActiveID(props.channel.id);
				props.setActiveName(receiver);
			}
			else {
				props.setActiveID(props.channel.id);
				props.setActiveName(props.channel.name)
			}
		}
		setLoad(true);
		props.setHide(false);
		calledOnce.current = true;
		*/
	}, [isSelected]);

	function selectChan() {
		
		if (load === true) {
			
			let selected = document.getElementsByClassName("chan-title_selected");

			for (let i = 0; i < selected.length; i++) {
				selected[i].className = 'chan-title_notselected';
			}

			setIsSelected("true");

			props.setActiveID(props.channel.id);
			props.setActiveName(props.channel.name);

			let other = document.getElementById("chan-title_".concat(props.channel.id));
			other.className = "chan-title_selected";

			//bahaas needs pass boolean in participat to display button change pass
			if (props.channel.password)
				props.setHasPass(true);
			else
				props.setHasPass(false);
			props.setHide(false);
		}
	}

	return (
		<>
			<div className="display_chan" id={"display_chan".concat("_" + props.channel.name)}>
				{load === true ? 
				<>
					<button type="button" id={"chan-title_".concat(props.channel.id)} className={isSelected === "true" ? "chan-title_selected" : "chan-title_notselected"}
						onClick={() => {selectChan()}}>{props.channel.name}</button>
				</> : ""}
			</div>
		</>
	);
}
