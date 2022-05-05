import React from "react";
import axios from "axios";
import ToastAlerts from "../ToastAlerts/ToastAlerts"

let url_begin = "";
if (process.env.REACT_APP_IP == "" || process.env.REACT_APP_IP == undefined)
    url_begin = "http://localhost";
else
    url_begin = "http://".concat(process.env.REACT_APP_IP);

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

    post_api_user_relation_sendInvation_id(login: string) {
        let url = url_begin.concat(":3000/api/user/relation/sendInvitation/").concat(login);

        let toast = new ToastAlerts(null);
        const body = {
            receiverLogin: login
        }

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url, body)
            .then(res => {
                window.top.location = url_begin.concat(":3030/profile/").concat(login);
            })
            .catch((error) => {
                toast.notifyDanger("Your invite failed")
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

        axios.post(url, body)
            .then(res => {
                toast.notifySuccess("Succesfully answered to invitation !");
                if (extra != "") {
                    let id = "minidisplay".concat("_" + login + "_" + extra);
                    let elem = document.getElementById(id);
                    elem.parentNode.removeChild(elem);
                }
            })
            .catch((error) => {
                toast.notifyDanger("Error while answering invitation");
            })
    }

    delete_relation_id(login: string, extra: string) {
        let url = url_begin.concat(":3000/api/user/relation/remove/").concat(login);

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        let toast = new ToastAlerts(null);

        axios.delete(url)
            .then(res => {
                toast.notifySuccess("Successfully removed friend.");
                if (extra != "") {
                    let id = "minidisplay".concat("_" + login + "_" + extra);
                    let elem = document.getElementById(id);
                    elem.parentNode.removeChild(elem);
                    window.top.location = url_begin.concat(":3030/profile/").concat(login);
                }
            })
            .catch((error) => {
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
                toast.notifySuccess("Successfully blocked user");
                if (blocked_from === "people")
                    window.top.location = url_begin.concat(":3030/profile/").concat(login);
            })
            .catch((error) => {
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
                if (extra != "") {
                    let id = "minidisplay".concat("_" + login + "_" + extra);
                    let elem = document.getElementById(id);
                    elem.parentNode.removeChild(elem);
                }
                window.top.location = url_begin.concat(":3030/profile/").concat(login);
            })
            .catch((error) => {
                toast.notifyDanger("Error while unblocking contact !");
            })
    }

    get_relation_status(login: string) {

        let url = url_begin.concat(":3000/api/user/relation/relationStatusWith/").concat(login);

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        let status = "";
        axios.get(url)
            .then(res => {
                let relation = res.data;
                status = relation.status;
            })
            .catch((error) => {
                ;
            })
        return status;
    }


    login(mail: string, pass: string) {
        const bod = {
            email: mail,
            password: pass,
        }

        const headers = {
            'Content-Type': 'application/json',
        };

        let toast = new ToastAlerts(null);

        axios.post(url_begin.concat(':3000/api/auth/log-in/'), bod, { headers })
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
                toast.notifyDanger("😢 Error while logging in !");
            })
    }

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

        axios.post(url_begin.concat(':3000/api/auth/register/'), bod, { headers }).then(res => {
            if (res.status == 201) {
                toast.notifySuccess('🦄 Yes! You are now registered ! You may log in.');
            }
            else {
                toast.notifyDanger('Oops ! An error happened during signup.');
            }
        })
            .catch((error) => {
                ;
            })
    }

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

        axios.get(url, { responseType: 'blob' })
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

    render_avatar(login: string, login42: string, haschanged: boolean, isUserProfile?: boolean) {
        if (!login) {
            return;
        }

        //Va permettre d'aller chercher l'image puis de la render
        let chosenLogin: string;
        let is42: boolean;

        login42 != "" ? chosenLogin = login : chosenLogin = login;
        login42 != "" ? is42 = true : is42 = false;

        let imageCode = null;

        let url = url_begin.concat(":3000/api/user/").concat(chosenLogin)

        let res = axios.get(url)
            .then(res => {
                imageCode = res.data.avatar;
                this.getImage(imageCode, chosenLogin, is42, haschanged);
            })
            .catch(error => {
                ;
            })
    }

    post_avatar(login: string, file: any) {
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

        axios.post(url, formData, { headers }).
            then(res => {
                if (res.status == 201) {
                    let haschanged = false;
                    if (res.data.login != res.data.login42)
                        haschanged = true;
                    this.render_avatar(login, "", haschanged);
                    window.top.location = url_begin.concat(":3030/settings");
                }
                else {
                    ;
                }
            })
            .catch((error) => {
                ;
            }
            )
    }

    post_2fa_turnOn(code?: string) {

        let url = url_begin.concat(":3000/api/2fa/turn-on");

        const body = {
            twoFactorAuthenticationCode: code
        }

        let toast = new ToastAlerts(null);

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url, body)
            .then(res => {
                toast.notifySuccess("✅ Successfully turned 2FA on !")
            })
            .catch((error) => {
                toast.notifyDanger("❌ Error while turning on 2FA.")
            })
    }

    post_2fa_logIn() {

        let url = url_begin.concat(":3000/api/2fa/login");

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url)
            .then(res => {
                ;
            })
            .catch((error) => {
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
                ;
            })
    }
}
