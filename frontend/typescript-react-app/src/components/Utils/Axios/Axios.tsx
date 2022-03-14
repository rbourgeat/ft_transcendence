import React from "react";
import axios from "axios";
import ToastAlerts from "../ToastAlerts/ToastAlerts"
import cookie from 'react-cookie';
import { Redirect } from 'react-router-dom';


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
    //rep?: Object,
    avatar?: string
}

/**
 * @malatini
 */
export default class MyAxios extends React.Component<AxiosProps, AxiosState>
{
    constructor(props: AxiosProps) {
        super(props);

        //Init state
        this.state =
        {
            status: 0,
            //rep: {}
        }
        //On parsera les props pour appeler directement la bonne methode ?
    }

    fourtytwoauthbis() {
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        };

        const bod = {
            //email: this.props.email,
            //password: this.props.password,
        }
        axios.defaults.baseURL = 'http://localhost:3000/api/';

        let res = axios.get("http://localhost:3000/api/auth/")
            .then(res => {
                console.log(res);
            })
            .catch((error) => {
                console.log("Catched error second auth");
                console.log(res);
            })
    }

    fourtytwoauth() {
        let toast = new ToastAlerts(null);
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        };

        const bod = {
            email: this.props.email,
            password: this.props.password,
        }

        axios.defaults.baseURL = 'http://localhost:3000/api/';

        let res = axios.get("http://localhost:3000/api/42auth/login"
        /*, bod, {headers}*/).then(res => {
            if (res.status == 200 || res.status == 201) {
                //console.log(res);
                //toast.notifySuccess("First 42 auth GET got 200 !");
                window.top.location = "http://localhost:3000/api/42auth/redirect/"
                //redirect

                axios.get("http://localhost:3000/api/42auth/redirect/").
                    then(res => {
                        if (res.status == 200 || res.status == 201) {
                            toast.notifySuccess("Second get ok !");
                            let res2 = axios.get("https://api.intra.42.fr/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2F42auth%2Fredirect&client_id=b5bf3f1429b36e0d96e2db81cb83bf3381760311c864cd0e96496874ca58a171")
                                .then(res2 => {

                                    if (res2.status == 201 || res2.status == 200) {
                                        toast.notifySuccess("Third get ok !!");
                                        console.log("Yay !!");
                                        //window.top.location = "http://localhost:3030/chat";
                                    }
                                })
                        }
                    })
            }
            else {
                console.log(res);
                toast.notifyDanger("First 42 auth GET got error...");
            }
        })
            .catch((error) => {
                toast.notifyDanger('Oops ! First 42 auth GET got error...');
            })
    }

    //pour l instant on va faire un peu betement et on verra comment faire une facon plus smart plus tard
    login() {
        axios.defaults.baseURL = 'http://localhost:3000/api/';
        axios.defaults.headers.post['Content-Type'] = '*';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

        let toast = new ToastAlerts(null);

        if (!this.props.email || !this.props.password) {
            toast.notifyDanger('Oops ! An error happened');
            return;
        }

        const bod = {
            email: this.props.email,
            password: this.props.password,
        }

        const headers = {
            'Content-Type': 'application/json'
        };

        console.log(bod);

        let res = axios.post('http://localhost:3000/api/auth/log-in/', bod, { headers })
            .then(res => {
                if (res.status == 200 || res.status == 201) {
                    console.log(res);
                    //TODO: utiliser plutot useContext (attention avec la classe ca risque d etre plus compliquee qu'avec la version)
                    //Solution trouvee apres maintes recherches pour rediriger depuis une classe et pas une fonction react
                    //window.top.location = "/user/";
                    window.top.location = "/chat/";
                    return;
                }
                else {
                    //return (400);
                    toast.notifyDanger('Oops ! An error happened, incorrect email or password.');
                    //console.log("Went to the else condition");
                    return;
                }
            })
        //.catch(function (error) =>
        //{
        //  //console.log(error);
        //  toast.notifyDanger('Oops ! An error happened, incorrect email or password.');
        //  //console.log("Catched error !");
        //})
        //console.log("here!");
    }

    createchat(username: string) {
        axios.defaults.baseURL = 'http://localhost:3000/api/';
        axios.defaults.headers.post['Content-Type'] = '*';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

        const bod = {
            admin: {
                login: username
            }
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
        //.catch((error) => {
        //    toast.notifyDanger('Oops ! An creating chat.');
        //    console.log("Catched error during post chat!");
        //})
    }

    //TODO: revoir encryption du mot de passe
    signup() {
        axios.defaults.baseURL = 'http://localhost:3000/api/';
        axios.defaults.headers.post['Content-Type'] = '*';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

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
}
