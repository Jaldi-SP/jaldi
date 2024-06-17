import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Login.scss";
import axios from "axios";
import Input from "../../Components/Input/Input";
import Label from "../../Components/Label/Label";
import ActionButton from "../../Components/ActionButton/ActionButton";

const Login = (props) => {
    const { setAuthenticated } = props;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [signUpUsername, setSignUpUsername] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPhone, setSignUpPhone] = useState("");
    const [signUpBusinessName, setSignUpBusinessName] = useState("");
    const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register
    const [serverError, setServerError] = useState("");

    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleSignUpUsernameChange = (event) =>
        setSignUpUsername(event.target.value);
    const handleSignUpPasswordChange = (event) =>
        setSignUpPassword(event.target.value);
    const handleSignUpEmailChange = (event) =>
        setSignUpEmail(event.target.value);
    const handleSignUpPhoneChange = (event) =>
        setSignUpPhone(event.target.value);
    const handleSignUpBusinessNameChange = (event) =>
        setSignUpBusinessName(event.target.value);

    const handleLogin = async () => {
        try {
            const res = await axios.post("/auth/login", { username, password });
            setAuthenticated(true);
        } catch (err) {
            setServerError(err.response.data);
        }
        setPassword("");
    };

    const handleSignUp = async () => {
        try {
            const res = await axios.post("/auth/register", {
                username: signUpUsername,
                password: signUpPassword,
                email: signUpEmail,
                phone_number: signUpPhone,
                name: signUpBusinessName,
            });
            setAuthenticated(true);
            alert("Sign-up successful");
        } catch (err) {
            setServerError(err.response.data);
        }
        setSignUpUsername("");
        setSignUpPassword("");
        setSignUpEmail("");
        setSignUpPhone("");
        setSignUpBusinessName("");
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="login-container">
            {isLogin ? (
                <div className="login-form">
                    <Label text="Username" />
                    <Input
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder={"Username"}
                    />
                    <Label text="Password" />
                    <Input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        onKeyDown={(event) => {
                            event.key === "Enter" && handleLogin();
                        }}
                        placeholder={"Password"}
                    />
                    <ActionButton
                        label="Sign in"
                        id="sign-in-button"
                        onClick={handleLogin}
                    />
                    <br />
                    <ActionButton
                        label="New here? Click here to sign up"
                        id="toggle-form"
                        onClick={toggleForm}
                    />
                    {serverError && (
                        <span className="error">{serverError}</span>
                    )}
                </div>
            ) : (
                <div className="signup-form">
                    <Label text="Username" />
                    <Input
                        value={signUpUsername}
                        onChange={handleSignUpUsernameChange}
                        placeholder={"Username"}
                    />
                    <Label text="Business Name" />
                    <Input
                        value={signUpBusinessName}
                        onChange={handleSignUpBusinessNameChange}
                        placeholder={"Business Name"}
                    />
                    <Label text="Business Email" />
                    <Input
                        value={signUpEmail}
                        onChange={handleSignUpEmailChange}
                        placeholder={"Business Email"}
                    />
                    <Label text="Business Phone" />
                    <Input
                        type="tel"
                        value={signUpPhone}
                        onChange={handleSignUpPhoneChange}
                        placeholder={"Business Phone Number"}
                        prefix="+91"
                        required
                    />
                    <Label text="Password" />
                    <Input
                        type="password"
                        value={signUpPassword}
                        onChange={handleSignUpPasswordChange}
                        placeholder={"Password"}
                        onKeyDown={(event) => {
                            event.key === "Enter" && handleSignUp();
                        }}
                    />
                    <ActionButton
                        label="Sign Up"
                        id="sign-up-button"
                        onClick={handleSignUp}
                    />
                    <br />
                    <ActionButton
                        label="Have an account? Sign in instead"
                        id="toggle-form"
                        onClick={toggleForm}
                    />
                    {serverError && (
                        <span className="error">{serverError}</span>
                    )}
                </div>
            )}
        </div>
    );
};

export default Login;
