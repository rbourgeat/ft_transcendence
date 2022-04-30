import './DisplayChan.scss';
import React, { useEffect } from 'react';


export interface DisplayChanProps {
	channel?: any;
	isChan?: boolean,
	dm?: any,
	minId?: any,
	login: string,
	setHasPass?: any,
	setActiveID?: any,
	setActiveName?: any
	receiver?: string,
}

export default function DisplayChan(props: DisplayChanProps) {

	const calledOnce = React.useRef(false);
	const [isSelected, setIsSelected] = React.useState("false");
	const [load, setLoad] = React.useState(false);
	const [receiver, setReceiver] = React.useState("");

	useEffect(() => {

		if (calledOnce.current) {
			return;
		}

		if (props.dm) {
			let rec;

			if (props.dm.participates[0].login == props.login || props.dm.participates[0].login === props.login)
				rec = props.dm.participates[1].login;
			//else if (props.dm.participates[0].login == props.dm.participates[1].login)
			//	console.log("Erreur, deux fois le même particpant");
			else
				rec = props.dm.participates[0].login;
			//console.log("rec is " + rec);
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
		calledOnce.current = true;
	}, [isSelected]);

	function selectChan() {
		if (load === true && props.isChan === true) {
			let selected = document.getElementsByClassName("chan-title_selected");
			selected.item(0).className = 'chan-title_notselected';
			setIsSelected("true");

			props.setActiveID(props.channel.id);
			props.setActiveName(props.channel.name);

			let other = document.getElementById("chan-title_".concat(props.channel.id));
			other.className = "chan-title_selected";

			//bahaas needs pass boolean in participat to display button change pass
			//console.log("password of channel:" + props.channel.password)

			if (props.channel.password)
				props.setHasPass(true);
			else
				props.setHasPass(false);
		}
	}

	function selectDM() {
		if (load === true && props.isChan === false) {
			let selected = document.getElementsByClassName("dm-title_selected");
			selected.item(0).className = 'dm-title_notselected';
			setIsSelected("true");

			//console.log("receiver is " + receiver);
			props.setActiveID(props.channel.id);
			props.setActiveName(receiver);

			let other = document.getElementById("dm-title_".concat(props.channel.id));
			other.className = "dm-title_selected";
		}
	}

	return (
		<>
			<div className="display_chan" id={"display_chan".concat("_" + props.channel.name)}>
				{load === true && props.isChan === true ? <>
					<button type="button" id={"chan-title_".concat(props.channel.id)} className={isSelected === "true" ? "chan-title_selected" : "chan-title_notselected"}
						onClick={selectChan}>{props.channel.name}</button>
				</> : ""}
			</div>
			<div className="display_dm" id={"dm_chan".concat("_" + props.channel.name)}>
				{load === true && props.isChan === false /*&& load2 == true*/ ? <>
					<button type="button" id={"dm-title_".concat(props.channel.id)} className={isSelected === "true" ? "dm-title_selected" : "dm-title_notselected"}
						onClick={selectDM}>{receiver}</button>
				</> : ""}
			</div>
		</>
	);
}
