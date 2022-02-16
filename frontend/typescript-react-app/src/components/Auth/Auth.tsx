import React from 'react'
import ReactDOM from 'react-dom';
import './Auth.css';
import { useNavigate } from "react-router-dom";
import { Form, Button} from 'react-bootstrap';
export default function Auth() {
    let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `home`; 
    navigate(path);
  }
    return (
        <div>
        <div className="wrapper">
            <div className="wave"></div>
        </div>
        < div id="auth-form-div" >
           
            <div id="auth--form" className="d-flex justify-content-center">
                <Form id="form-auth" className="forms">
                    <h2>Se connecter</h2>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Login</Form.Label>
                        <Form.Control type="email" placeholder="Login" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control type="password" placeholder="Mot de passe" />
                    </Form.Group>
                    <p></p>
                    <Form.Group className="mb-3" controlId="formBasicConnexion">
                        <button type="submit" className="btn btn-light btn-block" onClick={routeChange} id="auth-btn-1">Me connecter</button>
                    </Form.Group>
                    <hr className="my-4"></hr>
                    <Form.Group className="mb-3" controlId="formAuth42">
                        <button type="submit" className="btn btn-light btn-block" onClick={routeChange} id="auth-btn-3">Authentification 42</button>
                    </Form.Group>
                </Form>
                
                <Form className="forms">
                    <h2>S'inscrire</h2>
                    <Form.Group className="mb-3" controlId="formSignupUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="malatini42" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formSignUpEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="malatini@student.42.fr" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formSignupPassword">
                        {/* Pour ajouter des regles sur le password : https://developer.mozilla.org/fr/docs/Web/HTML/Element/Input/password */}
                        <Form.Label>Password</Form.Label>
                        <i className="far fa-eye" id="togglePassword"></i>
                        <Form.Control type="password" placeholder="******" />
                        {/* Ajouter un post ici ? */}
                    </Form.Group>
                    <button type="submit" className="btn btn-light btn-block" onClick={routeChange} id="auth-btn-2">M'inscrire</button>
                </Form>
            </div>
        </div >
        </div>
        );
}