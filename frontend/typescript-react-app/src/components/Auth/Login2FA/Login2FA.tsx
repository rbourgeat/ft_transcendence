import './Login2FA.scss';
import axios from "axios";
import React, { useEffect, useRef } from "react";
import AuthCode, { AuthCodeRef } from 'react-auth-code-input';
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';
import { ToastContainer } from "react-toastify";

export default function Login2fa() {
	const calledOnce = React.useRef(false);
	const [code, setCode] = React.useState("");
	const AuthInputRef = useRef<AuthCodeRef>(null);

	useEffect(() => {
		if (calledOnce.current) {
			return;
		}
		calledOnce.current = true;
	}, []);

	let checkcode = (event: any) => {
		event.preventDefault();
		let toast = new ToastAlerts(null);
		if (code.length != 6) {
			toast.notifyDanger("Error, the verif code is too short.");
			return;
		}

		let url = "";
		if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
			url = "http://localhost:3000/api/2fa/log-in";
		else
			url = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/2fa/log-in");
		axios.defaults.baseURL = "http://".concat(process.env.REACT_APP_IP).concat(":3000/api/");
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.post['Accept'] = '*/*';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.defaults.withCredentials = true;

		let bod = {
			twoFactorAuthenticationCode: code
		}

		axios.post(url, bod)
			.then(res => {
				localStorage.setItem("2faverif", "true");
				window.top.location = "http://".concat(process.env.REACT_APP_IP).concat(":3030/user");
			})
			.catch((error) => {
				toast.notifyDanger("😢 Error while logging in with 2fa");
			})
	}

	return (
		<div>
			<div id="login--2FA" className="container">
				<div className="row d-flex justify-content-center text-center">
					<div className="col-6">
						<div id="div--main--2fa">
							<br />
							<h1 className="game--rules--title">✨ 2 factor authentication</h1>
							<br />
							<div id="authcode-2fa">
								<AuthCode
									allowedCharacters='numeric'
									ref={AuthInputRef}
									inputClassName="auth--code_2fa"
									onChange={function (res: string): void {
										setCode(res);
									}} />
								<button type="submit" className="btn btn-outline-dark" value="Submit" id="check--button" onClick={checkcode}>Check code</button>
								<ToastContainer
									position="top-right"
									autoClose={5000}
									hideProgressBar={false}
									newestOnTop={false}
									closeOnClick
									rtl={false}
									pauseOnFocusLoss
									draggable
									pauseOnHover
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
