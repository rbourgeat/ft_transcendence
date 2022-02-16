import React, {useState }from 'react'
import ReactDOM from 'react-dom';
import './Auth.css';
// import { useNavigate } from "react-router-dom";
import { Form, Button} from 'react-bootstrap';
// import { trustedTypes } from 'trusted-types';
export default function Auth() {
//     let navigate = useNavigate(); 
//   const routeChange = () =>{ 
//     let path = `home`; 
//     navigate(path);
//   };
  
    const [showPass, setshowPass] = useState(false);
    console.log(showPass);
    return (
        <div>
        <div className="wrapper">
            <div className="wave"></div>
        </div>
        < div id="auth-form-div" >
           
            <div id="auth--form" className="d-flex justify-content-center">
                <Form id="form-auth" className="forms">
                    <h2>Bienvenue ! </h2>
                    <p>Pour jouer, vous devez vous authentifier 🤩</p>
                    <h3>Se connecter</h3>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Login</Form.Label>
                        <Form.Control type="email" placeholder="Login" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control type="password" placeholder="Mot de passe" />
                    </Form.Group>
                    <p></p>
                    {/* onClick={routeChange}  */}
                    <Form.Group className="mb-3" controlId="formBasicConnexion">
                        <button type="submit" className="btn btn-light btn-block" id="auth-btn-1" >Me connecter</button>
                    </Form.Group>
                    {/* <hr className="my-4"></hr> */}
                    {/* onClick={routeChange} */}
                    <Form.Group className="mb-3" controlId="formAuth42">
                        <button type="submit" className="btn btn-primary btn-block" id="auth-btn-3">Authentification 42</button>

                    </Form.Group>
                </Form>
                
                <Form className="forms">
                    <h3>S'inscrire</h3>
                    <Form.Group className="mb-3" controlId="formSignupUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="malatini42" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formSignUpEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="malatini@student.42.fr" />
                    </Form.Group>
                
                    {/* <div className="mb-3" id="formSignupPassword"> */}
                    <div id="password-form">
                        {/* Pour ajouter des regles sur le password : https://developer.mozilla.org/fr/docs/Web/HTML/Element/Input/password */}
                        <div id="sub-form">
                            <div>
                            {/* className="col-lg-6" */}
                                <form>
                                    <div>
                                        <label>
                                        Password
                                        </label>
                                        <input className="form-control" type={showPass? "text":"password"} />
                                    </div>
                                        <div className="mt-2" style={{textAlign:"right"}} id="show-password">
                                            <button type="button" className="btn btn-sm btn-light" onClick={() => {
                                                if (showPass == true)
                                                    setshowPass(false);
                                                else 
                                                    setshowPass(true);
                                            }}>
                                                {showPass ? "Cacher" : "Afficher"}
                                            </button>
                                        </div>
                                    </form>
                            </div>
                        </div>
                    </div>
                    <p></p>
                    <hr className="my-4"></hr>
                    <button type="submit" className="btn btn-light btn-block" id="signup">M'inscrire</button>
                    </Form>
            </div>
        </div >
        </div>
        );
}