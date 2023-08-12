import { useContext, useState } from "react";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

import UserContext from "../UserContext";

import "./login.css";

const Login = () => {
    /* for setting the user that is logged in */
    const { setIsLoggedIn } = useContext(UserContext);
    
    const navigate = useNavigate();

    const [signup, setSignup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [failedLoginMessage, setFailedLoginMessage] = useState(null);

    const handleEmailInput = (event) => setEmail(event.target.value);
    const handlePasswordInput = (event) => setpassword(event.target.value);


    /* Register information */
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [failedRegistrationMessage, setFailedRegistrationMessage] = useState(null);
    const [userExists, setUserExists] = useState(false);
    const [isSuccessfullyCreated, setIsSuccessfullyCreated] = useState(false);

    const handleCreateEmail = (event) => setNewEmail(event.target.value);
    const handleCreatePassword = (event) => setNewPassword(event.target.value);
    const handleConfirmPassword = (event) => setConfirmNewPassword(event.target.value);
    /* *************************** */

    /* Login and Registration handdle onClick functions */
    const handleLogin = (email, password) => {
        setFailedLoginMessage(null);
        // setIsLoading(true);

        const emailRegex = /^[A-z0-9]+@[A-z]+\.[A-z]{2,4}$/;

        if (!emailRegex.test(email)) {
            setFailedLoginMessage("Please provide a valid email address");
            setIsLoading(false);
            return;
        } else if (password.length == 0) {
            setFailedLoginMessage("Please provide a valid password");
            setIsLoading(false);
            return;
        }

        const login = async (loginDetails) => {
            try {
                const loginResponse = await fetch("http://localhost:3000/login", {
                    method: "POST",
                    headers: {
                      "Content-Type" : "application/json"
                    },
                    body: JSON.stringify(loginDetails)
                });
                if (loginResponse.ok) {
                    const data = await loginResponse.json();
                    const token = data.token;
  
                    localStorage.setItem("token", token);
                    localStorage.setItem("favourites", data.favourites);

                    setIsLoggedIn(true);

                    /*Go back to the previous page */
                    navigate(-1);
                } else {
                    const data = await loginResponse.json();
                    setFailedLoginMessage(data.error);
                }
            } catch (error) {
                console.log(error);
            }
        }
        login({email: email, password: password}).then((value) => setIsLoading(false));
    };
    
    const handleSignUp = (newEmail, newPassword, confirmNewPassword) => {
        setFailedRegistrationMessage(null);
        setIsLoading(true);
        const emailRegex = /^[A-z0-9]+@[A-z]+\.[A-z]{2,4}$/;
        const passwordRegex = /^(?=.*[A-z])(?=.*\d)[A-z\d]{8,}$/;
        
        if (!emailRegex.test(newEmail)) {
            setFailedRegistrationMessage("Please provide a valid email address");
            setIsLoading(false);
            return;
        } else if (confirmNewPassword !== newPassword) {
            setFailedRegistrationMessage("Please provide a matching passwords");
            setIsLoading(false);
            return;
        } else if (!passwordRegex.test(newPassword)) {
            setFailedRegistrationMessage("Please provide an alphanumeric password with at least 8 characters");
            setIsLoading(false)
            return;
        }

        const registerUser = async (details) => {
            try {
                const response = await fetch("http://localhost:3000/login/register", {
                    method: "POST",
                    headers: {
                      "Content-Type" : "application/json", 
                    },
                    body: JSON.stringify(details)
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data.message);
                    setIsSuccessfullyCreated(true);
                } else {
                    const data = await response.json();
                    console.log(data.error);
                    setFailedRegistrationMessage(data.error);
                }
            } catch (error) {
                setFailedRegistrationMessage(error);
            }
        }

        registerUser({email: newEmail, password: newPassword}).then((value) => setIsLoading(false));
        
    };

    const goBack = () => {
        navigate(-1);
    }

    return (
        <section className="login-page">
            <div className="login-form">
                <p className="title">{!signup ? "LOGIN" : "Register"}</p>
                {!signup ?
                    <>
                        <div>
                            <p className="label">UserName</p>
                            <input type="text"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailInput} />
                        </div>
                        <div>
                            <p className="label">Password</p>
                            <input type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordInput} />
                        </div>
                        {failedLoginMessage ? <p className="failed-message">{failedLoginMessage}</p> : <></>}
                    </>
                    :
                    <div className="registration">
                        <div>
                            <p className="label">Email</p>
                            <input type="text"
                                placeholder="Email"
                                value={newEmail}
                                onChange={handleCreateEmail} />
                        </div>

                        <div>
                            <p className="label">Enter Password</p>
                            <input type="password"
                                placeholder="Password"
                                value={newPassword}
                                onChange={handleCreatePassword} />
                        </div>

                        <div>
                            <p className="label">Confirm Password</p>
                            <input type="password"
                                placeholder="Confirm Password"
                                value={confirmNewPassword}
                                onChange={handleConfirmPassword} />
                        </div>
                        {failedRegistrationMessage ? <p className="failed-message">{failedRegistrationMessage}</p> : <></>}
                        {isSuccessfullyCreated ? <p className="sucessful-message">Sucessfully created!</p> : <></>}
                    </div>
                }
                

                
                <button className="login-button" disabled={isLoading} onClick={signup ? () => handleSignUp(newEmail.trim(), newPassword, confirmNewPassword) : () => handleLogin(email.trim(), password)}>{signup ? "Sign Up" : "Login"}</button>
                <p className="sign-up-link" onClick={() => setSignup(!signup)}>{signup ? "Back to login" : "Not a user yet? Click here to sign up" }</p>
                <div className="go-back" onClick={goBack}>
                    <BsArrowLeftSquareFill  className="return-icon"/>
                </div>
                
            </div>
        </section>
    )
}

export default Login;