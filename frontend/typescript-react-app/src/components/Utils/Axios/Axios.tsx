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
    ** get api cookie test
    */
   get_api_user_cookie_test()
   {
        const headers = {
            //'Content-Type': 'application/json',
            'Accept': '*/*'
        };
        axios.defaults.baseURL = 'http://localhost:3000/api/';

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

        let url = "http://localhost:3000/api/user/cookie/test";
        let res = axios.get(url)
        .then (res => {
            console.log("Successfully got cookies");
            console.log(res);
            console.log(res.data);
        })
        .catch((error) => {
            console.log("Catched error while getting cookies !");
            console.log(error);
            if (error.response) {
                // client received an error response (5xx, 4xx)
                console.log(error.response)
              } else if (error.request) {
                // client never received a response, or request never left
                console.log("Error in request");
              } else {
                // anything else
                console.log("Other type of error");
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
        //console.log(imageCode);
        let imageName = "alt-photo";
        let url = "http://localhost:3000/api/user/".concat(imageCode).concat("/avatar/");
        console.log("The url is " + url);
        let res = axios.get(url, {responseType: 'blob'})
        .then(res => {
            //console.log(res);
            //console.log(res.data);
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
        console.log(url);

        let res = axios.get(url)
        .then(res => {
            //console.log(res);
            imageCode = res.data.avatar;
            console.log("Image is " + imageCode);
            return (
                this.getImage(imageCode)
            );
        })
        .catch(error => {
            console.log("Catched error getting avatar");
        })
        return (
            <img src={imageCode} alt={imageName} height="80" width="80" id="avatar-id"/>
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

        let res = axios.post(url, formData, {headers}).
		then(res=>{
			if (res.status == 201)
			{
				console.log("Yay ! Avatar updated");
				//renderImage(props.username);
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
}
