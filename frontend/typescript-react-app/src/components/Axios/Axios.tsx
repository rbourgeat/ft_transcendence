import React from "react";
import axios from "axios";
import ToastAlerts from "../Utils/ToastAlerts/ToastAlerts"

interface AxiosProps {
    method?: string,
    ressource?: string
    email?: string,
    password?: string,
    password_conf?: string,
    username?: string
   // isLogged?: boolean
}

interface AxiosState {
    status?: number,
    rep?: Object,
    avatar?: string
}

//interface User {
//    data: {
//        avatar?: string,
//        status?: string,
//        total_games?: boolean,
//        total_wins?: boolean,
//        total_loss?: boolean,
//        win_loss_ration?: boolean,
//        two_factor_auth?: boolean,
//        id?: number,
//        createdAt?: Date,
//        updateAt?: Date,
//        login?: string,
//        email?: string,
//        password?: string,
//        //friends: Array,
//        //"two_factor_secret": "false",
//        //"is_ban": false,
//        //"is_admin": false,
//        //"blocked_users": null,
//        //"achievements": [],
//        login42: string
//    }
//}


export default class MyAxios extends React.Component<AxiosProps, AxiosState>
{
    constructor(props: AxiosProps)
    {
        super(props);
        this.state =
        {
            status: 0,
            rep: {}
        }
        //On parsera les props pour appeler directement la bonne methode ?
    }

    //pour l instant on va faire un peu betement et on verra comment faire une facon plus smart plus tard
    login()
    {
        axios.defaults.baseURL = 'http://localhost:3000/';
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
                console.log(res.data);
                console.log(res.status);
                console.log(res);
                if (res.status == 200)
                {
                    console.log(res);
                    //TODO: utiliser plutot useContext (attention avec la classe ca risque d etre plus compliquee qu'avec la version)
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
            axios.defaults.baseURL = 'http://localhost:3000/';
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
            console.log(bod);

            let res = axios.post('http://localhost:3000/api/auth/register/', bod, {headers}).then(res=>{
                console.log(res.data);
                console.log(res.status)
                if (res.status == 201)
                {
                    if (res.data.avatar)
                    {
                        toast.notifySuccess('🦄 Yes! You are now registered ! You may log in.');
                        return (res.data);
                    }

                }
                else
                {
                    toast.notifyDanger('Oops ! An error happened');
                    return (null);
                }
            }).catch((error) => {
                console.log("Catched error !");
                console.log(error);
                //toast.notifyDanger('Oops ! An error happened');
                return (null);
            })
    }

    //a reprendre quand ok pour user
    get_avatar(url: string): string
    {
        axios.defaults.baseURL = 'http://localhost:3000/';

        let toast = new ToastAlerts(null);

        let res = axios.get(url)
            .then(res=>
            {
                //console.log(res.data.status);
                console.log(res.statusText);
                //console.log(res.data.avatar);
                //console.log(res.status)
                if (res.statusText == "OK")
                {
                    //toast.notifySuccess('Avatar retrieved successfully');
                    //toast.notifySuccess(res.data.avatar);
                    //let avatar= new string(res.data.avatar);
                    const { data } = res;
                    let test: any = JSON.parse(res.data.avatar);
                    let avatar: string = ((data.avatar) as string);

                    //let avatar: string = data.avatar as string;
                    //console.log(typeof avatar)
                    return (this.state.avatar);
                }
                else
                {
                    toast.notifyDanger('🥲 Avatar was not retrieved successfully');
                    return ("https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg" as string);
                }
            }
            )
            .catch((error) => {
                console.log("Catched error !");
                //console.log(error);
                //toast.notifyDanger('Oops ! An error happened');
                return ("https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg");
            })
            return ("https://pbs.twimg.com/profile_images/1380427848075317248/nxgi57Th_400x400.jpg" as string);
    }
}
