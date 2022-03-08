import React from "react";
import axios from "axios";
import ToastAlerts from "../ToastAlerts/ToastAlerts"

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
    constructor(props: AxiosProps)
    {
        super(props);

        //Init state
        this.state =
        {
            status: 0,
            //rep: {}
        }
        //On parsera les props pour appeler directement la bonne methode ?
    }

    //pour l instant on va faire un peu betement et on verra comment faire une facon plus smart plus tard
    login()
    {
        axios.defaults.baseURL = 'http://localhost:3000/api/';
        axios.defaults.headers.post['Content-Type'] ='*';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

        let toast = new ToastAlerts(null);

        if (!this.props.email || !this.props.password)
        {
            toast.notifyDanger('Oops ! An error happened');
            return ;
        }

        const bod = {
            email: this.props.email,
            password: this.props.password,
        }

        const headers = {
            'Content-Type': 'application/json'
        };

        console.log(bod);

        let res = axios.post('http://localhost:3000/api/auth/log-in/', bod, {headers})
            .then(res=>{
                //console.log(res.data);
                //console.log(res.status);
                //console.log(res);
                if (res.status == 200 || res.status == 201)
                {
                    console.log(res);
                    //TODO: utiliser plutot useContext (attention avec la classe ca risque d etre plus compliquee qu'avec la version)
                    //Solution trouvee apres maintes recherches pour rediriger depuis une classe et pas une fonction react
                    window.top.location = "/user/";
                }
                else
                {
                    //return (400);
                    toast.notifyDanger('Oops ! An error happened');
                }
            })
            .catch(function (error) {
              console.log(error);
              toast.notifyDanger('Oops ! An error happened');
            })
    }

    //TODO: revoir encryption du mot de passe
    signup()
    {
            axios.defaults.baseURL = 'http://localhost:3000/api/';
            axios.defaults.headers.post['Content-Type'] ='*';
            axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

            const bod = {
                email: this.props.email,
                login: this.props.username,
                password:  this.props.password,
                password_confirmation: this.props.password_conf
            }

            const headers = {
                'Content-Type': 'application/json'
            };

            let toast = new ToastAlerts(null);

            let res = axios.post('http://localhost:3000/api/auth/register/', bod, {headers}).then(res=>{
                console.log(res.status)
                if (res.status == 201)
                {
                    toast.notifySuccess('🦄 Yes! You are now registered ! You may log in.');
                }
                else
                {
                    toast.notifyDanger('Oops ! An error happened during signup.');
                }
            })
            .catch((error) => {
                console.log("Catched error in signup function!");
            })
    }
}
