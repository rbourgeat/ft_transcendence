import React, {useState }from 'react'
import ReactDOM from 'react-dom';
import './Auth.css';
// import { useNavigate } from "react-router-dom";
import { Form, Button} from 'react-bootstrap';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

// import { trustedTypes } from 'trusted-types';
export default function Auth() {
//     let navigate = useNavigate(); 
//   const routeChange = () =>{ 
//     let path = `home`; 
//     navigate(path);
//   };
//TODO: Attention a revoir l'indentation
    const [showPass, setshowPass] = useState(false);
    const [showPassConfirm, setshowPassConfirm] = useState(false);
    const [showPassBis, setshowPassBis] = useState(false);

    //Confetti
    const { width, height } = useWindowSize();

    console.log(showPass);
    return (
        <>
        <Confetti
            width={width}
            height={height}
            // recycle={false}
        />
        <div className="wrapper">
            <div className="wave"></div>
        </div>
        <div className="container" id="auth-container">
        < div id="auth-form-div">
           
            <div id="auth--form" className="d-flex justify-content-center">
            {/* <div className="row"> */}
                {/* <div> */}
                <Form id="form-auth" className="forms">
                    <h2>Bienvenue ! </h2>
                    <p>Pour jouer, vous devez vous authentifier 🏓</p>
                    {/* Mettre authentication 42 seule separement */}
                    {/* <hr className="my-4"></hr> */}
                    <Form.Group className="form__mb-3" controlId="formAuth42">
                        <button type="submit" className="btn btn-primary btn-block" id="auth-btn-3">Authentification 42</button>
                    </Form.Group>
                    {/* <hr className="my-4"></hr> */}
                    <h3 id="se-connecter">Se connecter</h3>
                    <Form.Group className="form__mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        {/* Attention entre username et login */}
                        <input className="form-control" type="username" placeholder="malatini" required/>
                    </Form.Group>

                    <Form.Group className="form__mb-3" controlId="formBasicPassword">
                        <Form.Label>Mot de passe</Form.Label>
                        <input className="form-control" type={showPassBis ? "text":"password"} placeholder="********" required/>
                        <div className="mt-2" style={{textAlign:"right"}} id="show-password">
                                            <button type="button" className="btn btn-sm btn-light" onClick={() => {
                                                if (showPassBis == true)
                                                    setshowPassBis(false);
                                                else 
                                                    setshowPassBis(true);
                                            }}>
                                                {showPass ? "Cacher" : "Afficher"}
                                            </button>
                                        </div>
                    </Form.Group>
                    <p id="connect-p"></p>
                    {/* onClick={routeChange}  */}
                    <hr className="my-4" id="me-connecter_hr"></hr>
                    <Form.Group className="form__mb-3" controlId="formBasicConnexion">
                        <button type="submit" className="btn btn-light btn-block" id="auth-btn-1" >Me connecter</button>
                    </Form.Group>
                    
                    {/* onClick={routeChange} */}
                </Form>
                
                <Form className="forms">
                    <h3>S'inscrire</h3>
                    <Form.Group className="mb-3" controlId="formSignupUsername">
                        <Form.Label>Username</Form.Label>
                        <input className="form-control" type="username" placeholder="malatini" required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formSignUpEmail">
                        <Form.Label>Email</Form.Label>
                        <input className="form-control" type="email" placeholder="malatini@student.42.fr" required/>
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
                                        Mot de passe
                                        </label>
                                        <input className="form-control" type={showPass? "text":"password"} placeholder="********" required/>
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
                                    {/* En faire un deuxieme pour confirmation */}
                                    <form>
                                    <div>
                                        <label>
                                        Confirmation mot de passe
                                        </label>
                                        <input className="form-control" type={showPassConfirm? "text":"password"} placeholder="********" required/>
                                    </div>
                                        <div className="mt-2" style={{textAlign:"right"}} >
                                            <button type="button" id="show-password-3" className="btn btn-sm btn-light" onClick={() => {
                                                if (showPassConfirm == true)
                                                    setshowPassConfirm(false);
                                                else 
                                                    setshowPassConfirm(true);
                                            }}>
                                                {showPass ? "Cacher" : "Afficher"}
                                            </button>
                                        </div>
                                    </form>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" id="signup-hr"></hr>
                    <button type="submit" className="btn btn-light btn-block" id="signup">M'inscrire</button>
                </Form>
                
                </div>
                
                    
                </div> 
                
                
                {/* </div> */}
                
            {/* </div> */}
           
            
       
        {/* Wrapper */}
        </div>
        </>
        );
        
}