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
        < div id="auth-form-div" >

            <div id="auth--form" className="d-flex justify-content-center">
                <Form id="form-auth" className="forms">
                    <h2>Se connecter</h2>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Login</Form.Label>
                        <Form.Control type="email" placeholder="Login" />
                        {/* <Form.Text className="text-muted">
                            Entrez votre login
                        </Form.Text> */}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control type="password" placeholder="Mot de passe" />
                    </Form.Group>
                    {/* <Button className="btn btn-primary btn-lg btn-block" type="submit" onClick={routeChange}>
                        Je me connecte
                    </Button> */}
                    <p></p>
                    {/* <Button className="btn btn-primary btn-lg btn-block" type="submit" onClick={routeChange}>
                        Authentification API 42
                    </Button> */}
                    <Form.Group className="mb-3" controlId="formBasicConnexion">
                        <button type="submit" className="btn btn-secondary btn-block" onClick={routeChange} id="auth-btn-1">Block level button</button>
                    </Form.Group>
                    
                </Form>
                
                <Form className="forms">
                    <h2>S'inscrire</h2>
                    <Form.Group className="mb-3" controlId="formSignupUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="malatini42" />
                        {/* <Form.Text className="text-muted">
                            Entrez votre login et non votre adresse mail.
                        </Form.Text> */}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formSignUpEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="malatini@student.42.fr" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formSignupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="******" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formSignupConfirmPassword">
                        <Form.Label>Confirm Email</Form.Label>
                        <Form.Control type="confirmemail" placeholder="******" />
                    </Form.Group>

                    <button type="submit" className="btn btn-secondary btn-block" onClick={routeChange} id="auth-btn-2">M'inscrire</button>
                </Form>
            </div>
        </div >);
}