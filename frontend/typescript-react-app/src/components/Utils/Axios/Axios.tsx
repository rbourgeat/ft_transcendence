import React, { cloneElement } from "react";
import axios from "axios";
import ToastAlerts from "../ToastAlerts/ToastAlerts"
import cookie from 'react-cookie';
import Login from "../../Auth/Login/Login";

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

        //Init state
        this.state =
        {
            status: 0,
        }
    }

    /*
    ** Chat endpoints
    */
    get_api_chat()
    {
        axios.defaults.withCredentials = true;

        let url = "http://localhost:3000/api/chat/";
        let res = axios.get(url)
        .then( res => {
            console.log("Get api chat successfully called.");
        })
        .catch((error) => {
            console.log("Error while getting all channels");
        })
    }

    /*
    ** Create a channel with channel name, public boolean and password argument
    */
    post_api_chat(channame: string, pub: boolean, pass: string)
    {
        let url = "http://localhost:3000/api/chat/";

        //Pas sure que ce soit utile
        let headers = {
            'Content-Type': 'application/json'
        }

        const body = {
            password: pass,
            public: pub,
            name: channame
        }

        axios.defaults.baseURL = 'http://localhost:3000/api/';
		axios.defaults.headers.post['Content-Type'] ='application/json';
		axios.defaults.headers.post['Accept'] ='*/*';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        //Useful to debug request
        /*
        axios.interceptors.request.use(request => {
            console.log('Starting Request', JSON.stringify(request, null, 2))
            return request
        })

        axios.interceptors.response.use(response => {
            console.log('Response:', JSON.stringify(response, null, 2))
            return response
        })
        */

        let res = axios.post(url, body, { headers })
        .then( res => {
            console.log("successfully posted a chat !");
        })
        .catch((error) => {
            console.log("Catched error on post api chat.");
            //console.log(error);
        })
    }

    /*
    ** post /api/chat/message -> attente endpoint à modifier ?
    */
   //TODO: attendre update

    /*
    ** post /api/chat/join
    */
    //TODO: à tester
    post_api_chat_join(pass: string, pub: boolean, channame: string)
    {
        let url = "http://localhost:3000/api/chat/join";

        const body = {
            password: pass,
            public: pub,
            name: channame
        }

        axios.defaults.baseURL = 'http://localhost:3000/api/';
		axios.defaults.headers.post['Content-Type'] ='application/json';
		axios.defaults.headers.post['Accept'] ='*/*';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url, body)
        .then( res => {
            console.log("Succesfully joined channel !");
        })
        .catch (res => {
            console.log("Error while joining channel 😢");
        })
    }

    /*
    ** Sending a message in a channel
    */
    //TODO: a tester
    post_api_chat_sendmessage(message: string, channame: string)
    {
        let url = "http://localhost:3000/api/chat/sendMessage/";

        const body = {
            content: message,
            name: channame
        }

        axios.defaults.baseURL = 'http://localhost:3000/api/';
		axios.defaults.headers.post['Content-Type'] ='application/json';
		axios.defaults.headers.post['Accept'] ='*/*';

        //Verifier si la ligne du dessous est vraiment utile
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url, body)
        .then( res => {
            console.log("Succesfully send message to channel !");
        })
        .catch (res => {
            console.log("Error while sending message to channel 😢");
        })
    }

    /*
    ** Leaving a channel
    */
    //TODO: a tester
    post_api_chat_quit(pass: string, pub: boolean, channame: string)
    {
        let url = "http://localhost:3000/api/chat/quit/";

        const body = {
            password: pass,
            public: pub,
            name: channame
        }

        axios.defaults.baseURL = 'http://localhost:3000/api/';
		axios.defaults.headers.post['Content-Type'] ='application/json';
		axios.defaults.headers.post['Accept'] ='*/*';

        //Verifier si la ligne du dessous est vraiment utile
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url, body)
        .then( res => {
            console.log("Succesfully left channel !");
        })
        .catch (res => {
            console.log("Error while leaving channel 😢 !");
        })
    }

    /*
    ** get /api/chat/id/messages
    */
    //TODO: faire un retour sur ce endpoint également + tester
    get_api_id_messages(id: string)
    {
        let url = "http://localhost:3000/api/chat/".concat(id).concat("/messages/");

        //voir quel body il faudrait ?
        axios.defaults.baseURL = 'http://localhost:3000/api/';
		axios.defaults.headers.post['Content-Type'] ='application/json';
		axios.defaults.headers.post['Accept'] ='*/*';

        //Verifier si la ligne du dessous est vraiment utile
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.get(url)
        .then(res => {
            console.log("Successfully retrieved all messages");
        })
        .catch(res => {
            console.log("Error while retrieving all messages");
        })
    }

    /*
    ** Setting an admin
    */
    //TODO: a tester
    post_api_set_admin(id: number, username: string, datetime: string, pass: string)
    {
        let url = "http://localhost:3000/api/chat/setAdmin/";

        const body = {
            idChat: id,
            user: username,
            time: datetime,
            password: pass,
        }

        axios.defaults.baseURL = 'http://localhost:3000/api/';
		axios.defaults.headers.post['Content-Type'] ='application/json';
		axios.defaults.headers.post['Accept'] ='*/*';

        //Verifier si la ligne du dessous est vraiment utile
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url, body)
        .then(res => {
            console.log("Successfully made target an admin");
        })
        .catch(res => {
            console.log("Error while making target admin");
        })
    }

    //TODO: a tester
    post_api_ban(id: number, username: string, datetime: string, pass: string)
    {
        let url = "http://localhost:3000/api/chat/ban/";

        const body = {
            idChat: id,
            user: username,
            time: datetime,
            password: pass,
        }

        //Verifier si la ligne du dessous est vraiment utile
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url, body)
        .then(res => {
            console.log("Successfully banned target");
        })
        .catch(res => {
            console.log("Error while banning target");
        })
    }

    //TODO: a tester et variabiliser !
    //A variabiliser pour économiser les lignes
    post_api_unban(id: number, username: string, datetime: string, pass: string)
    {
        let url = "http://localhost:3000/api/chat/unban/";

        const body = {
            idChat: id,
            user: username,
            time: datetime,
            password: pass,
        }

        //Verifier si la ligne du dessous est vraiment utile
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url, body)
        .then(res => {
            console.log("Successfully banned target");
        })
        .catch(res => {
            console.log("Error while banning target");
        })
    }

    //TODO: a tester et variabiliser !
    post_api_mute(id: number, username: string, datetime: string, pass: string)
    {
        let url = "http://localhost:3000/api/chat/mute/";

        const body = {
            idChat: id,
            user: username,
            time: datetime,
            password: pass,
        }

        //Verifier si la ligne du dessous est vraiment utile
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url, body)
        .then(res => {
            console.log("Successfully banned target");
        })
        .catch(res => {
            console.log("Error while banning target");
        })
    }

    //TODO: a tester et variabiliser !
    post_api_password(id: number, username: string, datetime: string, pass: string)
    {
        let url = "http://localhost:3000/api/chat/password/";

        const body = {
            idChat: id,
            user: username,
            time: datetime,
            password: pass,
        }

        //Verifier si la ligne du dessous est vraiment utile
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url, body)
        .then(res => {
            console.log("Successfully banned target");
        })
        .catch(res => {
            console.log("Error while banning target");
        })
    }

    //TODO: a tester et variabiliser !
    post_api_setprivate(id: number, username: string, datetime: string, pass: string)
    {
        let url = "http://localhost:3000/api/chat/setPrivate/";

        const body = {
            idChat: id,
            user: username,
            time: datetime,
            password: pass,
        }

        //Verifier si la ligne du dessous est vraiment utile
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url, body)
        .then(res => {
            console.log("Successfully banned target");
        })
        .catch(res => {
            console.log("Error while banning target");
        })
    }

    //TODO: a tester et variabiliser !
    post_api_setpublic(id: number, username: string, datetime: string, pass: string)
    {
        let url = "http://localhost:3000/api/chat/setPublic/";

        const body = {
            idChat: id,
            user: username,
            time: datetime,
            password: pass,
        }

        //Verifier si la ligne du dessous est vraiment utile
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url, body)
        .then(res => {
            console.log("Successfully banned target");
        })
        .catch(res => {
            console.log("Error while banning target");
        })
    }

    /* DEPRECATED, ne plus utiliser
    createchat(username: string) {
        let bod = {
            password:
        }

        let toast = new ToastAlerts(null);
        const headers = {
            'Content-Type': 'application/json'
        };

        let res = axios.post('http://localhost:3000/api/chat', bod, { headers }).then(res => {
            console.log(res.status)
            if (res.status == 201) {
                toast.notifySuccess('💬  Chat created !');
            }
            else {
                toast.notifyDanger('Oops ! An creating chat.');
            }
        })
    }
    */

    /*
    ** get api cookie test - DEPRECATED
    get_api_user_cookie_test()
    {
        axios.defaults.baseURL = 'http://localhost:3000/api/';

        let url = "http://localhost:3000/api/user/cookie/test";
        let res = axios.get(url)
        .then (res => {
            console.log("Successfully got cookies");
            console.log(res);
            console.log(res.data);
        })
        .catch((error) => {
            console.log("Catched error while getting cookies !");
            //console.log(error);
            if (error.response) {
                console.log(error.response)
            }
            else if (error.request) {
                console.log("Error in request");
            }
            else {
                console.log("Other type of error");
            }
        })
    }
    */

    /*
    ** User endpoint
    */
    get_api_user(username: string) {
        axios.defaults.baseURL = 'http://localhost:3000/api/';


        let toast = new ToastAlerts(null);
        let url = "http://localhost:3000/api/user/".concat(username);

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        let res = axios.get(url)
        .then( res => {
            //console.log(res);
            console.log("Succesfully got user data");
        })
        .catch((error) => {
            //console.log(error);
            console.log("Error while getting user data");
        })
    }

    /*
    ** Relation endpoint
    */

    //Send invitation
    //TODO: a tester ! -> est-ce qu'on veut vraiment gérer ça ?
    post_api_user_relation_sendInvation_id(id: number)
    {
        let url = "http://localhost:3000/api/user/relation/sendInvitation/".concat(id.toString());

        const body = {
            receiverId: id
        }

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        let res = axios.post(url, body)
        .then( res => {
            console.log(res);
            console.log("Succesfully sent invitation !");
        })
        .catch((error) => {
            console.log(error);
            console.log("Error while sending invitation");
        })
    }

    //TODO: a tester ! -> est-ce qu'on veut vraiment gérer ça ?
    post_api_user_relation_answerInvitation_id(id: number)
    {
        let url = "http://localhost:3000/api/user/relation/answerToInvitation/".concat(id.toString());

        const body = {
            receiverId: id
        }

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        let res = axios.post(url, body)
        .then( res => {
            console.log(res);
            console.log("Succesfully posting invitaton");
        })
        .catch((error) => {
            console.log(error);
            console.log("Error while posting invitation");
        })
    }

    //TODO: received invitations
    get_api_received_invitations(id: number)
    {
        let url = "http://localhost:3000/api/user/relation/answerToInvitation/".concat(id.toString());

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.get(url)
        .then( res => {
            console.log("Succesfully retrieved received invitation");
            console.log(res);
        })
        .catch((error) => {
            console.log("Error while retrieving received invitation");
            console.log(error);
        })

    }

    //TODO: get all friends - a tester etc
    get_api_me_allfriends()
    {
        let url = "http://localhost:3000/api/user/relation/me/allFriends/"

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.get(url)
        .then( res => {
            console.log("Succesfully retrieved all friends");
            console.log(res);
        })
        .catch((error) => {
            console.log("Error while retrieving all friends");
            console.log(error);
        })
    }

    //TODO: a tester
    delete_relation_id(id: number)
    {
        let url = "http://localhost:3000/api/user/relation/remove/".concat(id.toString());

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.delete(url)
        .then( res => {
            console.log("Succesfully delete target friend");
            console.log(res);
        })
        .catch((error) => {
            console.log("Error while deleting target friend");
            console.log(error);
        })
    }

    //TODO: a tester
    post_relation_block(id: number)
    {
        let url = "http://localhost:3000/api/user/relation/block/".concat(id.toString());

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url)
        .then( res => {
            console.log("Succesfully blocked target friend");
            console.log(res);
        })
        .catch((error) => {
            console.log("Error while blocking target friend");
            console.log(error);
        })
    }

    //TODO: a tester
    delete_relation_unblock(id: number)
    {
        let url = "http://localhost:3000/api/user/relation/unblock/".concat(id.toString());

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.delete(url)
        .then( res => {
            console.log("Succesfully blocked target friend");
            console.log(res);
        })
        .catch((error) => {
            console.log("Error while blocking target friend");
            console.log(error);
        })
    }

    //TODO: a tester
    get_relation_allBlocked()
    {
        let url = "http://localhost:3000/api/user/relation/me/allBlocked/";

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url)
        .then( res => {
            console.log("Succesfully blocked target friend");
            console.log(res);
        })
        .catch((error) => {
            console.log("Error while blocking target friend");
            console.log(error);
        })
    }

    /*
    ** AUTH ENDPOINT
    */

    /*
    ** Auth - login
    */
    login(mail: string, pass: string) {
        //let toast = new ToastAlerts(null);

        //if (!this.props.email || !this.props.password) {
        //    toast.notifyDanger('Oops ! An error happened');
        //    return;
        //}

        const bod = {
            email: mail,
            password: pass,
        }

        const headers = {
            'Content-Type': 'application/json'
        };

        console.log(bod);

        let res = axios.post('http://localhost:3000/api/auth/log-in/', bod, { headers })
            .then(res => {
                if (res.status == 200 || res.status == 201) {
                    //console.log(res);
                    window.top.location = "/chat/";
                    return;
                }
                else {
                    //toast.notifyDanger('Oops ! An error happened, incorrect email or password.');
                    console.log("Did not receive 200 when logging it.");
                    return;
                }
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

        let res = axios.post('http://localhost:3000/api/auth/register/', bod, { headers }).then(res => {
            console.log(res.status)
            if (res.status == 201) {
                toast.notifySuccess('🦄 Yes! You are now registered ! You may log in.');
            }
            else {
                toast.notifyDanger('Oops ! An error happened during signup.');
            }
        })
            .catch((error) => {
                console.log("Catched error in signup function!");
            })
    }

    /*
    ** renderAvatar
    */
    getImage(imageCode: string)
    {
         //console.log("Should only be called if the image is not default image");
        let imageName = "alt-photo";
        if (imageCode.startsWith("http"))
            return ( <img src="https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg" alt={imageName} height="80" width="80" id="avatar-id"/>);

        let url = "http://localhost:3000/api/user/".concat(imageCode).concat("/avatar/");
       // console.log("The url is " + url);
        let res = axios.get(url, {responseType: 'blob'})
        .then(res => {
            let myImage = document.querySelector('img');
            var objectURL = URL.createObjectURL(res.data);
            myImage.src = objectURL;
            return (
                <img src={myImage.src} alt={imageName} height="80" width="80" id="avatar-id"/>
            )
        })
        .catch ((error) => {
            console.log("Catched error during get/fileId/avatar");
        })
    }

    render_avatar(login: string)
    {
        let imageCode = "https://42.fr/wp-content/uploads/2021/08/42.jpg";
        let imageName = "alt-photo";
        let url = "http://localhost:3000/api/user/".concat(login);

        let res = axios.get(url)
        .then(res => {
            imageCode = res.data.avatar;
            //console.log("Image is " + imageCode);
            return (this.getImage(imageCode));
        })
        .catch(error => {
            //console.log("Catched error getting avatar");
        })
        return (
            <img src={imageCode} alt={imageName} height="80" width="80" id="avatar-id" style={{marginBottom:"20px", border:"0.1rem solid grey"}}/>
        );
    }

    post_avatar(login: string, file: any)
    {
        let url = "http://localhost:3000/api/user/avatar/".concat(login);

        axios.defaults.baseURL = 'http://localhost:3000/api/';
		axios.defaults.headers.post['Content-Type'] ='multipart/form-data';
		axios.defaults.headers.post['Accept'] ='*/*';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

		const headers = {
			'Content-Type': 'multipart/form-data'
		};
		const formData = new FormData();
		formData.append('file', file);
		formData.append('type', 'file');;
        //console.log(file);

        let res = axios.post(url, formData, {headers}).
		then(res=>{
			if (res.status == 201)
			{
				console.log("Yay ! Avatar updated");
                this.render_avatar(login);
			}
			else
			{
				console.log("Oops! Avatar not updated");
			}
		})
		.catch((error) => {
			console.log("Catched error !");}
		)
	}

    /*
    ** edit user data (for login)
    */
    //TODO: a implémenter test
    patch_user(old_login: string, new_login: string)
    {
        let url = "http://localhost:3000/api/user/".concat(old_login);

        axios.defaults.baseURL = 'http://localhost:3000/api/';
		axios.defaults.headers.post['Content-Type'] ='application/json';
		axios.defaults.headers.post['Accept'] ='*/*';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

        let body = {
            login: new_login
        }

        let headers = {
            login: new_login
        }

        let res = axios.patch(url, body, {headers})
        .then(res=>{
			console.log("Yay ! Successfully changed login");})
		.catch((error) => {
			console.log("Catched error !");}
		)
        //Attention j'ai bien réussi à changer le nom mais maintenant le component n'a plus la bonne props
    }

    /*
    ** Gestion du 2FA
    */
    post_2fa_generate()
    {
        console.log("Generating 2fa");

        let url = "http://localhost:3000/api/2fa/generate";

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url)
        .then(res => {
            console.log("Successfully banned target");
            console.log(res);
        })
        .catch((error) => {
            console.log("Error while banning target");
            console.log(error);
        })
    }

    post_2fa_turnOn(code: string)
    {
        console.log("Turning on 2fa");

        let url = "http://localhost:3000/api/2fa/turn-on";

        const body = {
            twoFactorAuthenticationCode: code
        }

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url, body)
        .then(res => {
            console.log("Successfully turn 2fa on");
            console.log(res);
        })
        .catch((error) => {
            console.log("Error while turning 2fa on");
            console.log(error);
        })
    }

    post_2fa_logIn()
    {
        console.log("Turning on 2fa");

        let url = "http://localhost:3000/api/2fa/login";

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;

        axios.post(url)
        .then(res => {
            console.log("Successfully logging with 2fa");
            console.log(res);
        })
        .catch((error) => {
            console.log("Error while logging in with 2fa");
            console.log(error);
        })
    }
    //TODO: demander un endpoint pour le endpoint pour turn off (et log out ?)
}
