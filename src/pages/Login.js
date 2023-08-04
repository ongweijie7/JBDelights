import { useContext, useState } from "react";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useLocation, useNavigate } from 'react-router-dom';

import UserContext from "../UserContext";

import "./login.css";

const Login = () => {
    /* for setting the user that is logged in */
    const { setIsLoggedIn } = useContext(UserContext);
    
    const navigate = useNavigate();
    const location = useLocation();

    const [signup, setSignup] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");

    const [isWrongDetails, setIsWrongDetails] = useState(false);

    const handleEmailInput = (event) => setEmail(event.target.value);
    const handlePasswordInput = (event) => setpassword(event.target.value);

    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    /* Register information */
    const [isWrongRegisterDetails, setIsWrongRegisterDetails] = useState(false);
    const [userExists, setUserExists] = useState(false);
    const [isSuccessfullyCreated, setIsSuccessfullyCreated] = useState(false);


    const handleCreateEmail = (event) => setNewEmail(event.target.value);
    const handleCreatePassword = (event) => setNewPassword(event.target.value);
    const handleConfirmPassword = (event) => setConfirmNewPassword(event.target.value);


    const handleLogin = () => {
        
        setIsLoading(true);

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
                    setIsLoggedIn(true);

                    /*Go back to the previous page */
                    navigate(-1);
                } else {
                    setIsWrongDetails(true);
                }
                
            } catch (error) {
                console.log(error);
            }
        }
        login({email: email, password: password}).then((value) => setIsLoading(false));
    };
    
    const handleSignUp = () => {
        setIsLoading(true);

        if (confirmNewPassword != newPassword) {
            setIsWrongRegisterDetails(true);
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
                const data = await response.json();
                setIsSuccessfullyCreated(true);
                
            } catch (error) {
                console.log(error);
                setUserExists(true);
            }
        }

        registerUser({email: newEmail, password: newPassword}).then((value) => setIsLoading(false));
        
    };

    const goBack = () => {
        navigate(-1);
    }

    return (
        <section className="login">
            <div className="content">
                <p className="title">{!signup ? "LOGIN" : "Register"}</p>
                {!signup ?
                    <>
                    <div>
                        <p className="label">UserName</p>
                        <input type="text"
                            placeholder="Username"
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
                    {isWrongDetails ? <p>Wrong username or password</p> : <></>}
                    </>
                    :
                    <>
                    <div>
                    <p className="label">Email</p>
                    <input type="text"
                        placeholder="Username"
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
                    <p className="hidden">Confirm Password</p>
                    <input type="password"
                        placeholder="Confirm Password"
                        value={confirmNewPassword}
                        onChange={handleConfirmPassword} />
                    </div>
                    {isWrongRegisterDetails ? <p>Password don't match</p> : <></>}
                    {userExists ? <p>User already exists</p> : <></>}
                    {isSuccessfullyCreated ? <p>Sucessfully created!</p> : <></>}
                    </>
                }
                

                
                <button className="login-button" onClick={signup ? handleSignUp : handleLogin}>{signup ? "Sign Up" : "Login"}</button>
                <p className="sign-up-link" onClick={() => setSignup(!signup)}>{signup ? "Back to login" : "Not a user yet? Click here to sign up" }</p>
                <div className="go-back" onClick={goBack}>
                    <BsArrowLeftSquareFill  className="return-icon"/>
                </div>
                
            </div>
        </section>
    )
}

export default Login;