import React, { useState } from 'react';
import './Login.scss';
import axios from 'axios';
import Input from '../../Components/Input/Input';
import Label from '../../Components/Label/Label';
import ActionButton from '../../Components/ActionButton/ActionButton';

const Login = (props) => {
    const {setAuthenticated} = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleAccessCodeChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post("/auth/login", {username, password})
            setAuthenticated(true);
        } catch (err) {
            console.log(err)
        }
        setUsername('');
        setPassword('');
    };

    return (
        <div className='login-container'>
            <div className="login-form">
                <Label text="Username"/>
                <Input
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder={"Username"}
                />
                <Label text="Password"/>
                <Input
                    type="password"
                    value={password}
                    onChange={handleAccessCodeChange}
                    placeholder={"Access code"}
                />
                <ActionButton label="Sign in" id="sign-in-button" onClick={handleSubmit}/>
            </div>
        </div>
    );
}

export default Login;
