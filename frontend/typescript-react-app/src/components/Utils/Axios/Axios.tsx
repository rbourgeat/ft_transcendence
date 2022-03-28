import React from "react";
import axios from "axios";
import ToastAlerts from "../ToastAlerts/ToastAlerts"
import cookie from 'react-cookie';

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
        }
    }

    /*
    ** Chat endpoints
    */
    get_api_chat()
    {
        let url = "http://localhost:3000/api/chat/";
        let res = axios.get(url)
        .then( res => {
            console.log("Get api chat successfully called.");
            console.log(res);
            return (res);
        })
        .catch((error) => {
            console.log(error);
            return (error);
        })
    }

    post_api_chat(channame: string, pub: boolean, pass: string)
    {
        let url = "http://localhost:3000/api/chat/";
        let headers = {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        }

        let body = {
            password: pass,
            public: pub,
            name: channame
        }

        console.log(body);
        console.log(headers);
        console.log(url);

        //Intercepteur pour voir la requete
        axios.interceptors.request.use(request => {
            console.log('Starting Request', JSON.stringify(request, null, 2))
            return request
          })

        axios.interceptors.response.use(response => {
            console.log('Response:', JSON.stringify(response, null, 2))
            return response
          })

        let res = axios.post(url, body, { headers })
        .then( res => {
            console.log(res);
            console.log("successfully posted a chat !");
            //return (res);
        })
        .catch((error) => {
            console.log("Catched error on post api chat.");
            console.log(error);
            //return (error);
        })
    }

    createchat(username: string) {
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
    }

    /*
    ** User endpoint
    */
    get_api_user(username: string) {
        axios.defaults.baseURL = 'http://localhost:3000/api/';

        let toast = new ToastAlerts(null);
        let url = "http://localhost:3000/api/user/".concat(username);

        let res = axios.get(url)
        .then( res => {
            console.log(res);
            return (res);
        })
        .catch((error) => {
            console.log(error);
            return (error);
        })
    }

    /*
    ** Auth - login
    */
    login() {
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
                    toast.notifyDanger('Oops ! An error happened, incorrect email or password.');
                    return;
                }
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
