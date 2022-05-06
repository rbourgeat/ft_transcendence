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
	setHide?: any,
	socket?: any,
	update?: string,
	setIsChan?: any,
	activeName?: string,
	direct?: any
}

export default function DisplayChan(props: DisplayChanProps) {
	const [isSelected, setIsSelected] = React.useState(false);
	const [load, setLoad] = React.useState(false);
	const [receiver, setReceiver] = React.useState("");

	useEffect(() => {
		if (props.direct === true) {
			if (props.channel.participates[0].login == props.login && props.login != null) {
				props.setActiveName(props.channel.participates[1].login);
				setReceiver(props.channel.participates[1].login)
			}
			else if (props.login != "null" && props.channel.participates[0].login != null) {
				props.setActiveName(props.channel.participates[0].login);
				setReceiver(props.channel.participates[0].login);
			}
			else {
				setReceiver("dummy");
			}
		}
		setLoad(true);
		return () => { setLoad(false)};
	}, [isSelected, props.isChan]);

	function selectChan() {

		if (load === true) {
			let selected = document.getElementsByClassName("chan-title_selected");
			for (let i = 0; i < selected.length; i++) {
				selected[i].className = 'chan-title_notselected';
			}

			setIsSelected(true);
			props.setActiveID(props.channel.id);
			props.setActiveName(props.channel.name);

			let other = document.getElementById("chan-title_".concat(props.channel.id));
			other.className = "chan-title_selected";

			if (props.channel.password)
				props.setHasPass(true);
			else
				props.setHasPass(false);

			if (props.channel.name.startsWith("direct_"))
				props.setIsChan(false);
			else
				props.setIsChan(true);
			props.setHide(false);
		}
	}

	return (
		<>
			<div className="display_chan" id={"display_chan".concat("_" + props.channel.name)}>
				{load === true ?
					<>
						<button
							type="button" id={"chan-title_".concat(props.channel.id)}
							className={isSelected === true ? "chan-title_selected" : "chan-title_notselected"}
							onClick={() => { selectChan(); }
							}>{props.direct == false ? props.channel.name : receiver}</button>
					</> : ""}
			</div>
		</>
	);
}
