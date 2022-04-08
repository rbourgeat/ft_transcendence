import React, {Component, useState} from "react";
import Nav from "../../Nav/Nav"

export default function CreateChanModal(props) {
	const [channame, setChannname] = React.useState("");
	const [isSelected, setIsSelected] = React.useState(true);

	const policies = ["Public", "Protected", "Private"];

	const [policy, setPolicy] = useState(["Public", "Protected", "Private"])
	const [selectedPoli, setSelectPoli] = useState("Public");
	const Pol = policy.map(Pol => Pol
	)
	const handlePol= (e) => {
		setSelectPoli((policy[e.target.value]));
	}

	function handleCreate()
	{
		console.log("policy is " + policy);
		console.log("chan is " + channame);
	}

		return (
			<div id="modal--create--channel">
				{/*<Modal
					{...props}
					size="l"
					aria-labelledby="contained-modal-title-vcenter"
					centered
				>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Create new channel
					</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div id="create--channel--div">
							<label className="modal--label">Channel name</label>
							<input
								className="form-control"
								type="text"
								placeholder="unique channel name"
								onChange={(e)=>{this.setChanname({channame: e.target.value})}}
							/>
							<div id="public--policy">
							<label className="modal--label">Select policy</label>


							<select
								className="form-select form-select-sm"
								aria-label="form-select-sm" id="policy--select"
								onChange={(e)=>{this.setPolicy({policy: e.target.value})}}
							>
								{policies.map(item => (
									<option
									value={item}
									selected={isSelected}
									>{item}</option>
									))}
							</select>
							<br />
							< select
								onChange={e => handlePol(e)}
								className="form-select form-select-sm"
								>
								//{Pol.map((address, key) => <option key={key}value={key}>{address}</option>)}
							</select >
							</div>
							<br />
							<label className="modal--label">Password</label>
							<input
								className="form-control"
								type="text"
								placeholder="Password"
								//disabled={isDisabled}
								onChange={(e)=>{this.setPass({pass: e.target.value})}}
							/>
						</div>
						<Button variant="success"onClick={handleCreate}>Create</Button>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={props.onHide} variant="light">Close</Button>
					</Modal.Footer>
				</Modal>
				*/}
			</div>)
		//	);
	//}
}
//export default CreateChanModal;
