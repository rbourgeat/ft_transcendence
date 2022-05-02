import React, { cloneElement } from "react";
import axios from "axios";
import ToastAlerts from "../ToastAlerts/ToastAlerts"
import Login from "../../Auth/Login/Login";

let url_begin = "http://".concat(process.env.REACT_APP_IP);

interface AxiosProps {
    method?: string,
    ressource?: string
    email?: string,
    password?: string,
    password_conf?: string,
    username?: string
}

interface AxiosState {
    status?: number,
    avatar?: string
}

export default class MyAxios extends React.Component<AxiosProps, AxiosState>
{
    constructor(props: AxiosProps) {
        super(props);
        this.state =
        {
            status: 0,
        }
    }

    get_api_chat() {
        axios.defaults.withCredentials = true;

        let url = url_begin.concat(":3000/api/chat/");
        let res = axios.get(url)
            .then(res => {
                //console.log("Get api chat successfully called.");
                ;
            })
            .catch((error) => {
                //console.log("Error while getting all channels");
                ;
            })
    }

    /*
    ** post /api/chat/join
    */
    post_api_chat_join(pass: string, pub: boolean, channame: string) {
        let url = url_begin.concat(":3000/api/chat/join");

        const body = {
            password: pass,
            public: pub,
            name: channame
        }

        axios.defaults.baseURL = url_begin.concat(':3000/api/');
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post['Accept'] = '*/*';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url, body)
            .then(res => {
                // console.log("Succesfully joined channel !");
                ;
            })
            .catch(res => {
                //console.log("Error while joining channel 😢");
                ;
            })
    }

    /*
    ** Sending a message in a channel
    */
    post_api_chat_sendmessage(message: string, channame: string) {
        let url = url_begin.concat(":3000/api/chat/sendMessage/");

        const body = {
            content: message,
            name: channame
        }

        axios.defaults.baseURL = url_begin.concat(':3000/api/');
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post['Accept'] = '*/*';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url, body)
            .then(res => {
                //console.log("Succesfully send message to channel !");
                ;
            })
            .catch(res => {
                //console.log("Error while sending message to channel 😢");
                ;
            })
    }

    /*
    ** Leaving a channel
    */
    post_api_chat_quit(pass: string, pub: boolean, channame: string) {
        let url = url_begin.concat(":3000/api/chat/quit/");

        const body = {
            password: pass,
            public: pub,
            name: channame
        }

        axios.defaults.baseURL = url_begin.concat(':3000/api/');
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post['Accept'] = '*/*';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url, body)
            .then(res => {
                //console.log("Succesfully left channel !");
                ;
            })
            .catch(res => {
                //console.log("Error while leaving channel 😢 !");
                ;
            })
    }

    /*
    ** get /api/chat/id/messages
    */
    get_api_id_messages(id: string) {
        let url = url_begin.concat(":3000/api/chat/").concat(id).concat("/messages/");

        axios.defaults.baseURL = url_begin.concat(':3000/api/');
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post['Accept'] = '*/*';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.get(url)
            .then(res => {
                //console.log("Successfully retrieved all messages");
                ;
            })
            .catch(res => {
                //console.log("Error while retrieving all messages");
                ;
            })
    }

    /*
    ** Setting an admin
    */
    post_api_set_admin(id: number, username: string, datetime: string, pass: string) {
        let url = url_begin.concat(":3000/api/chat/setAdmin/");

        const body = {
            idChat: id,
            user: username,
            time: datetime,
            password: pass,
        }

        axios.defaults.baseURL = url_begin.concat(':3000/api/');
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post['Accept'] = '*/*';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url, body)
            .then(res => {
                //console.log("Successfully made target an admin");
                ;
            })
            .catch(res => {
                //console.log("Error while making target admin");
                ;
            })
    }

    post_api_ban(id: number, username: string, datetime: string, pass: string) {
        let url = url_begin.concat(":3000/api/chat/ban/");

        const body = {
            idChat: id,
            user: username,
            time: datetime,
            password: pass,
        }

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url, body)
            .then(res => {
                //console.log("Successfully banned target");
                ;
            })
            .catch(res => {
                //console.log("Error while banning target");
                ;
            })
    }

    post_api_unban(id: number, username: string, datetime: string, pass: string) {
        let url = url_begin.concat(":3000/api/chat/unban/");

        const body = {
            idChat: id,
            user: username,
            time: datetime,
            password: pass,
        }

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url, body)
            .then(res => {
                //console.log("Successfully unbanned target");
                ;
            })
            .catch(res => {
                //console.log("Error while unbanning target");
                ;
            })
    }

    post_api_mute(id: number, username: string, datetime: string, pass: string) {
        let url = url_begin.concat(":3000/api/chat/mute/");

        const body = {
            idChat: id,
            user: username,
            time: datetime,
            password: pass,
        }

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url, body)
            .then(res => {
                //console.log("Successfully muted target");
                ;
            })
            .catch(res => {
                //console.log("Error while muted target");
                ;
            })
    }


    post_api_password(id: number, username: string, datetime: string, pass: string) {
        let url = url_begin.concat(":3000/api/chat/password/");

        console.log("post apo password called");
        const body = {
            idChat: id,
            user: username,
            time: datetime,
            password: pass,
        }

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url, body)
            .then(res => {
                //console.log("Successfully posted password target");
                ;
            })
            .catch(res => {
                //console.log("Error while posted password target");
                ;
            })
    }

    post_api_setprivate(id: number, username: string, datetime: string, pass: string) {
        let url = url_begin.concat(":3000/api/chat/setPrivate/");

        console.log("post api set private called");
        const body = {
            idChat: id,
            user: username,
            time: datetime,
            password: pass,
        }

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url, body)
            .then(res => {
                console.log("Successfully set private");
            })
            .catch(res => {
                console.log("Error while set private target");
            })
    }

    post_api_setpublic(id: number, username: string, datetime: string, pass: string) {
        let url = url_begin.concat(":3000/api/chat/setPublic/");

        const body = {
            idChat: id,
            user: username,
            time: datetime,
            password: pass,
        }

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url, body)
            .then(res => {
                //console.log("Successfully banned target");
                ;
            })
            .catch(res => {
                //console.log("Error while banning target");
                ;
            })
    }


    /*
    ** User endpoint
    */
    get_api_user(username: string) {
        axios.defaults.baseURL = url_begin.concat(':3000/api/');


        let toast = new ToastAlerts(null);
        let url = url_begin.concat(":3000/api/user/").concat(username);

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        let res = axios.get(url)
            .then(res => {
                //console.log("Succesfully got user data");
                ;
            })
            .catch((error) => {
                //console.log("Error while getting user data");
                ;
            })
    }

    /*
    ** Relation endpoint
    */

    //Send invitation
    post_api_user_relation_sendInvation_id(login: string) {
        let url = url_begin.concat(":3000/api/user/relation/sendInvitation/").concat(login);

        let toast = new ToastAlerts(null);
        const body = {
            receiverLogin: login
        }

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        let res = axios.post(url, body)
            .then(res => {
                //console.log(res);
                //console.log("Succesfully sent invitation !");
                window.top.location = url_begin.concat(":3030/profile/").concat(login);
            })
            .catch((error) => {
                toast.notifyDanger("Your invite failed")
                //console.log(error);
                //console.log("Error while sending invitation");
            })
    }

    post_api_user_relation_answerInvitation_id(login: string, status: string, extra: string) {
        let url = url_begin.concat(":3000/api/user/relation/answerToInvitation/").concat(login);

        const body = {
            status: status
        }

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;
        let toast = new ToastAlerts(null);

        let res = axios.post(url, body)
            .then(res => {
                toast.notifySuccess("Succesfully answered to invitation !");
                if (extra != "") {
                    let id = "minidisplay".concat("_" + login + "_" + extra);
                    //console.log("id looked is " + id);
                    let elem = document.getElementById(id);
                    elem.parentNode.removeChild(elem);
                }
            })
            .catch((error) => {
                //console.log(error);
                //console.log("Error while posting invitation");
                toast.notifyDanger("Error while answering invitation");
            })
    }

    get_api_received_invitations(id: number) {
        let url = url_begin.concat(":3000/api/user/relation/answerToInvitation/").concat(id.toString());

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.get(url)
            .then(res => {
                //console.log("Succesfully retrieved received invitation");
                //console.log(res);
                ;
            })
            .catch((error) => {
                //console.log("Error while retrieving received invitation");
                //console.log(error);
                ;
            })

    }

    get_api_me_allfriends() {
        let url = url_begin.concat(":3000/api/user/relation/me/allFriends/");

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.get(url)
            .then(res => {
                //console.log("Succesfully retrieved all friends");
                //console.log(res);
                ;
            })
            .catch((error) => {
                //console.log("Error while retrieving all friends");
                //console.log(error);
                ;
            })
    }

    delete_relation_id(login: string, extra: string) {
        let url = url_begin.concat(":3000/api/user/relation/remove/").concat(login);

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        let toast = new ToastAlerts(null);

        axios.delete(url)
            .then(res => {
                //console.log("Succesfully delete target friend");
                //console.log(res);
                toast.notifySuccess("Successfully removed friend.");
                if (extra != "") {
                    let id = "minidisplay".concat("_" + login + "_" + extra);
                    //console.log("id looked is " + id);
                    let elem = document.getElementById(id);
                    elem.parentNode.removeChild(elem);
                    window.top.location = url_begin.concat(":3030/profile/").concat(login);
                }
            })
            .catch((error) => {
                //console.log("Error while deleting target friend");
                //console.log(error);
                toast.notifyDanger("Error while removing friend.");
            })
    }

    post_relation_block(login: string, blocked_from: string) {
        let url = url_begin.concat(":3000/api/user/relation/block/").concat(login);

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        let toast = new ToastAlerts(null);

        axios.post(url)
            .then(res => {
                //console.log("Succesfully blocked target friend");
                //console.log(res);
                toast.notifySuccess("Successfully blocked user");
                if (blocked_from === "people")
                    window.top.location = url_begin.concat(":3030/profile/").concat(login);
            })
            .catch((error) => {
                //console.log("Error while blocking target friend");
                //console.log(error);
                toast.notifyDanger("Error while blocking contact");
                if (blocked_from === "people")
                    window.top.location = url_begin.concat(":3030/profile/").concat(login);
            })
    }

    delete_relation_unblock(login: string, extra: string) {
        let url = url_begin.concat(":3000/api/user/relation/unblock/").concat(login);

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        let toast = new ToastAlerts(null);

        axios.delete(url)
            .then(res => {
                //console.log("Succesfully unblocked target friend");
                //console.log(res);
                if (extra != "") {
                    let id = "minidisplay".concat("_" + login + "_" + extra);
                    //console.log("id looked is " + id);
                    let elem = document.getElementById(id);
                    elem.parentNode.removeChild(elem);
                }
                window.top.location = url_begin.concat(":3030/profile/").concat(login);
            })
            .catch((error) => {
                //console.log("Error while unblocking target friend");
                //console.log(error);
                toast.notifyDanger("Error while unblocking contact !");
            })
    }

    /*async*/
    get_relation_status(login: string) {

        console.log("get relation with" + login);
        let url = url_begin.concat(":3000/api/user/relation/relationStatusWith/").concat(login);

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        let status = "";
        axios.get(url)
            .then(res => {
                //console.log("Succesfully get relation status with" + login);
                //console.log(res);
                let relation = res.data;
                //console.log(relation.status);
                status = relation.status;
            })
            .catch((error) => {
                //console.log("Error while get relation status with" + login);
                //console.log(error);
                ;
            })
        return status;
    }

    get_relation_allBlocked() {
        let url = url_begin.concat(":3000/api/user/relation/me/allBlocked/");

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url)
            .then(res => {
                //console.log("Succesfully blocked target friend");
                //console.log(res);
                ;
            })
            .catch((error) => {
                //console.log("Error while blocking target friend");
                //console.log(error);
                ;
            })
    }

    /*
    ** AUTH ENDPOINTS
    */

    /*
    ** Auth - login
    */
    login(mail: string, pass: string) {
        const bod = {
            email: mail,
            password: pass,
        }

        const headers = {
            'Content-Type': 'application/json',

        };

        console.log(bod);
        let toast = new ToastAlerts(null);

        let res = axios.post(url_begin.concat(':3000/api/auth/log-in/'), bod, { headers })
            .then(res => {
                if (res.status == 200 || res.status == 201) {
                    localStorage.setItem("loggedIn", "true");
                    localStorage.setItem("login", res.data.login);
                    if (res.data.login42 != null || res.data.login42 != undefined || res.data.login42 != "")
                        localStorage.setItem("login42", res.data.login42);
                    else
                        localStorage.setItem("login42", "");
                    window.top.location = url_begin.concat(":3030/user");
                }
            })
            .catch((error) => {
                //console.log("Error while logging in.");
                toast.notifyDanger("😢 Error while logging in !");
                //console.log(error);
            })
    }

    /*
    ** Singup / register
    */
    signup() {
        const bod = {
            email: this.props.email,
            login: this.props.username,
            password: this.props.password,
            password_confirmation: this.props.password_conf
        }

        const headers = {
            'Content-Type': 'application/json'
        };

        let toast = new ToastAlerts(null);

        let res = axios.post(url_begin.concat(':3000/api/auth/register/'), bod, { headers }).then(res => {
            console.log(res.status)
            if (res.status == 201) {
                toast.notifySuccess('🦄 Yes! You are now registered ! You may log in.');
            }
            else {
                toast.notifyDanger('Oops ! An error happened during signup.');
            }
        })
            .catch((error) => {
                //console.log("Catched error in signup function!");
                ;
            })
    }

    /*
    ** renderAvatar
    */
    getImage(imageCode: string, login: string, is42: boolean, haschanged: boolean) {

        let imageName = "alt-photo";
        let imageUser42 = "";
        let login42 = localStorage.getItem("login42");

        //Va chercher l'image 42 si c'est un user 42 et qu'il n'a pas changé son username
        if (haschanged == false)
            imageUser42 = "https://cdn.intra.42.fr/users/".concat(login).concat(".jpg")
        else
            imageUser42 = "https://cdn.intra.42.fr/users/".concat(login42).concat(".jpg")

        //Si l'utilisateur a une image qui n'a pas été uploadée (par défaut)
        if (imageCode.startsWith("http")) {
            let myImage: HTMLImageElement = document.querySelector("#".concat(login));
            if (is42)
                myImage.src = imageUser42;
            else
                myImage.src = "https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg";
            return (<img className="profile--pic" src={myImage.src} alt={imageName} height="80" width="80" id={login} />);
        }

        //Va chercher l'image uploadée
        let url = url_begin.concat(":3000/api/user/").concat(imageCode).concat("/avatar/");

        let res = axios.get(url, { responseType: 'blob' })
            .then(res => {
                let myImage = document.querySelector('img');
                var objectURL = URL.createObjectURL(res.data);
                myImage.src = objectURL;
                return (
                    <img className="profile--pic" src={myImage.src} alt={imageName} height="80" width="80" />
                )
            })
            .catch((error) => {
                return (<img className="profile--pic" src="https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg" alt={imageName} height="80" width="80" id={login} />);
            })
    }

    render_avatar(login: string, login42: string, haschanged: boolean) {
        if (!login) {
            return;
        }

        //Va permettre d'aller chercher l'image puis de la render
        let chosenLogin: string;
        let is42: boolean;

        login42 != "" ? chosenLogin = login : chosenLogin = login;
        login42 != "" ? is42 = true : is42 = false;

        let imageCode = null;
        let imageName = "alt-photo";
        let url = url_begin.concat(":3000/api/user/").concat(chosenLogin)

        let res = axios.get(url)
            .then(res => {
                imageCode = res.data.avatar;
                return (this.getImage(imageCode, chosenLogin, is42, haschanged));
            })
            .catch(error => {
                //console.log("Catched error getting avatar");
                ;
            })
    }

    post_avatar(login: string, file: any) {
        //Permet d'uploader son avatar / image
        let url = url_begin.concat(":3000/api/user/avatar/").concat(login);

        axios.defaults.baseURL = url_begin.concat(':3000/api/');
        axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
        axios.defaults.headers.post['Accept'] = '*/*';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

        const headers = {
            'Content-Type': 'multipart/form-data'
        };
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', 'file');

        let res = axios.post(url, formData, { headers }).
            then(res => {
                if (res.status == 201) {
                    //console.log("Yay ! Avatar updated");
                    let haschanged = false;
                    if (res.data.login != res.data.login42)
                        haschanged = true;
                    this.render_avatar(login, "", haschanged);
                    window.top.location = url_begin.concat(":3030/settings");
                }
                else {
                    //console.log("Oops! Avatar not updated");
                    ;
                }
            })
            .catch((error) => {
                //console.log("Catched error !");
                ;
            }
            )
    }

    /*
    ** edit user data (for login)
    */
    patch_user(old_login: string, new_login: string) {

    }

    /*
    ** Gestion du 2FA
    */
    post_2fa_generate() {
        console.log("Generating 2fa");

        let url = url_begin.concat(":3000/api/2fa/generate");

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url)
            .then(res => {
                //console.log("Successfully generate 2fa target");
                //console.log(res);
                ;
            })
            .catch((error) => {
                //console.log("Error while generating 2fa target");
                ;
                //console.log(error);
            })
    }

    post_2fa_turnOn(code?: string) {
        console.log("Turning on 2fa");

        let url = url_begin.concat(":3000/api/2fa/turn-on");

        const body = {
            twoFactorAuthenticationCode: code
        }

        console.log("Code is " + code);
        let toast = new ToastAlerts(null);

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url, body)
            .then(res => {
                //console.log("Successfully turn 2fa on");
                //console.log("The res is " + res);
                toast.notifySuccess("✅ Successfully turned 2FA on !")
            })
            .catch((error) => {
                //console.log("Error while turning 2fa on");
                toast.notifyDanger("❌ Error while turning on 2FA.")
                //console.log(error);
            })
    }

    post_2fa_logIn() {
        console.log("Turning on 2fa");

        let url = url_begin.concat(":3000/api/2fa/login");

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url)
            .then(res => {
                //console.log("Successfully logging with 2fa");
                //console.log(res);
                ;
            })
            .catch((error) => {
                //console.log("Error while logging in with 2fa");
                //console.log(error);
                ;
            })
    }


    get_api_achievements() {
        let url = url_begin.concat(":3000/api/user/achievements/me");

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;


        axios.get(url)
            .then(res => {
                let arr = res.data.map(element => element.title)
                return arr;
            })
            .catch((error) => {
                //console.log("Error while retrieve achievements");
                //console.log(error);
                ;
            })
    }
}
