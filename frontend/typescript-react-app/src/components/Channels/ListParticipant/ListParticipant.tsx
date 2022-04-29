import './ListParticipant.scss';
import React from "react";
import Participant from './Participant/Participant';
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import ToastAlerts from '../../Utils/ToastAlerts/ToastAlerts';
import MyAxios from '../../Utils/Axios/Axios';
import { Button, Modal, Form } from 'react-bootstrap';

export interface ParticipantProps {
    login: string,
    isChan?: boolean,
    hasPass?: boolean,
    setHasPass?: any,
    activeID?: string,
    activeName?: string
}

export default function ListParticipant(props: ParticipantProps) {
    const [selectedUser, updateSelectedUser] = React.useState("");
    const [functionToUse, updateFunctionToUse] = React.useState("");
    const [participates, updateParticipates] = React.useState([]);
    const [currentUserAdmin, setCurrentUserAdmin] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const [passFail, setPassFAil] = React.useState("");
    const [newPass, setNewPass] = React.useState("");
    const [newPassConf, setNewPassConf] = React.useState("");


    React.useEffect(() => {
        //console.log("------LIST PARTICIPANT PROPS--------");
        //console.log("activeID:" + props.activeID);
        //console.log("activeName:" + props.activeName);
        //console.log("isChan:" + props.isChan);
        //console.log("hasPass:" + props.hasPass);
        //console.log("--------------");

        if (props.isChan === true) {
            getUsersfromChannel();
            getCurrentUserAdminStatus();
        }
        else if (props.isChan === false)
            getUsersfromChannel();

        async function getUsersfromChannel() {
            let url: string;
            url = "http://localhost:3000/api/chat/".concat(props.activeID).concat("/users");
            axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
            axios.defaults.withCredentials = true;
            await axios.get(url)
                .then(response => {
                    updateParticipates(response.data);
                })
                .catch(error => {
                    //onsole.log("Error while getting users from a Channel/DM");
                    ;
                })
        }

        async function getCurrentUserAdminStatus() {
            let url = "http://localhost:3000/api/chat/isAdminIn/".concat(props.activeID);
            axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
            axios.defaults.withCredentials = true;
            await axios.get(url)
                .then(res => {
                    if (res.data === true)
                        setCurrentUserAdmin(true);
                })
                .catch((err) => {
                    //console.log("Error while getting api auth");
                    ;
                })
        }
    }, [props.activeID])

    React.useEffect(() => {
        //console.log("selectedUser is set to : " + selectedUser);
    }, [selectedUser])

    React.useEffect(() => {
        //console.log("functionToUse is set to : " + functionToUse);
        executeFunction(functionToUse);
    }, [functionToUse])

    function executeFunction(param: string) {
        switch (param) {
            case 'block':
                return blockUser();
            case 'invite':
                return inviteToPlay();
            case 'admin':
                return setAdmin();
            case 'mute':
                return muteUser();
            case 'ban':
                return banUser();
            case 'unban':
                return unbanUser();
            case 'unmute':
                return unmuteUser();
            case 'leave':
                return leaveChannel();
            case 'profile':
                return seeProfile();
            case 'dm':
                return sendDM();
        }
    }

    function unbanUser() {
        makeAPIcall("unban", "Successfully unbanned", "Error while unbanning", false);
    }

    function banUser() {
        makeAPIcall("ban", "Successfully ban", "Error while banning", false);
    }

    function unmuteUser() {
        makeAPIcall("unmute", "Successfully unmuted", "Error while unmuting", false);
    }

    function setAdmin() {
        makeAPIcall("setAdmin", "Successfully set as admin", "Error while setting as admin", false);
    }

    function muteUser() {
        makeAPIcall("mute", "Successfully mute", "Error while muting", false);
    }

    function leaveChannel() {
        makeAPIcall("quit", "Successfull quit", "Error while quitting channel", true);
    }

    function blockUser() {
        let ax = new MyAxios(null);
        ax.post_relation_block(selectedUser, "chat");
    }

    function sendDM() {
        let toast = new ToastAlerts(null);
        toast.notifyDanger("A reprendre.");
    }

    function inviteToPlay() {
        let toast = new ToastAlerts(null);
        toast.notifyDanger("A reprendre.");
    }

    function seeProfile() {
        window.top.location = "http://localhost:3030/profile/".concat(selectedUser);
    }

    async function makeAPIcall(endpoint: string, toastSuccessMessage: string, toastErrorMessage: string, me: boolean) {
        let toast = new ToastAlerts(null);
        const url = 'http://localhost:3000/api/chat/'.concat(endpoint);

        let user: string;
        me === true ? user = props.login : user = selectedUser;
        const body = {
            "idChat": props.activeID,
            "user": user
        }
        await axios.post(url, body)
            .then(response => {
                toast.notifySuccess(toastSuccessMessage);
                if (endpoint == "quit") {
                    //let elem: any;
                    if (props.isChan == true) {
                        document.getElementById("display_chan_".concat(props.activeName)).remove();
                        let title = document.getElementsByClassName("chan-title_notselected")[0].innerHTML;
                        document.getElementsByClassName("chan-title_notselected")[0].className = 'chan-title_selected';
                    }
                    else {
                        document.getElementById("dm_chan_".concat(props.activeName)).remove();
                    }

                }
            })
            .catch(error => {
                //toast.notifyDanger(toastErrorMessage);
                ;
            })
    }

    const handleClose = () => setShow(false);

    const handleShow = () => {
        setNewPass("");
        setNewPassConf("");
        setPassFAil("")
        setShow(true);
    }

    const handleSend = () => {
        if (newPass !== newPassConf) {
            setPassFAil("Pass doesn't match")
        }
        else {
            updatePass();
            handleClose();
        }
    }

    const handleRemovePass = () => {
        let toast = new ToastAlerts(null);
        const url = 'http://localhost:3000/api/chat/password';

        const body = {
            "idChat": props.activeID,
            "password": null
        }
        axios.post(url, body)
            .then(response => {
                toast.notifySuccess("Remove password :)");
                handleClose();
            })
            .catch(error => {
                toast.notifyDanger("Fail to remove password");
            })
        props.setHasPass(false);
    }

    async function updatePass() {
        let toast = new ToastAlerts(null);
        const url = 'http://localhost:3000/api/chat/password';

        const body = {
            "idChat": props.activeID,
            "password": newPass
        }
        await axios.post(url, body)
            .then(response => {
                toast.notifySuccess("Update password :)");
            })
            .catch(error => {
                toast.notifyDanger("Fail to update password");
            })
    }

    return (
        <div id="ListParticipant" className="col-3">
            <h2 id="participant--title">Members</h2>
            <div id="sub--div">
                {
                    <div id="participants--div">
                        {participates.map(participate =>
                            <Participant
                                isChannel={props.isChan}
                                currentUserAdmin={currentUserAdmin}
                                currentUser={props.login}
                                key={participate.id}
                                username={participate.user.login}
                                role={participate.role}
                                owner={participate.owner}
                                admin={participate.admin}
                                updateSelectedUser={updateSelectedUser}
                                updateFunctionToUse={updateFunctionToUse} />
                        )}
                    </div>
                }
            </div>
            <div className="buttons_div">
                <div className="row">
                    <div className="col">
                        {props.isChan === false ? null : <button id="leave--button" className="btn btn-danger" onClick={leaveChannel}>Leave channel</button>}
                        {currentUserAdmin === true && props.hasPass ?
                            <button id="leave--button" className="btn btn-warning" onClick={handleShow}>Update password</button>
                            :
                            null
                        }
                        <Modal show={show} animation={true} onHide={handleClose}>
                            <Modal.Body>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>New Password *</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={newPass}
                                            onChange={e => { setNewPass(e.target.value) }}
                                            autoFocus
                                            placeholder="******"
                                            className={passFail ? "fail" : ""}
                                        />
                                    </Form.Group>
                                    <p className="fail">{passFail}</p>
                                    <Form.Group>
                                        <Form.Label>New Password confirmation *</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={newPassConf}
                                            onChange={e => { setNewPassConf(e.target.value) }}
                                            autoFocus
                                            placeholder="******"
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" onClick={handleRemovePass}>
                                    Remove Pass
                                </Button>
                                {newPassConf && newPass ?
                                    <Button variant="success" onClick={handleSend} >
                                        Confirm New Pass
                                    </Button>
                                    :
                                    <Button variant="success" onClick={handleSend} disabled>
                                        Confirm New Pass
                                    </Button>
                                }
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
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
    );
}
