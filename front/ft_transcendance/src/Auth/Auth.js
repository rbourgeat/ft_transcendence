import React from 'react'
import ReactDOM from 'react-dom';
import './Auth.css';
import { Form, Button } from 'react-bootstrap';
export default function Auth() {
    return (
        < div id="auth-form-div" >

            <div id="auth--form" className="d-flex justify-content-center">
                <Form>
                    <h2>Connectez-vous !</h2>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Student login </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            Entrez votre login et non votre adresse mail.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Me connecter
                    </Button>
                </Form>
            </div>
        </div >);
}