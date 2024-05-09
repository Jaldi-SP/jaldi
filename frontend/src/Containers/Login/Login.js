import React, { useState } from 'react';
import './Login.scss';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleAccessCodeChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = () => {
        console.log("Logging in with:", username, password);
        setUsername('');
        setPassword('');
    };

    return (
        <div className='login-container'>
            <div className="login-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <input
                    type="password"
                    placeholder="Access code"
                    value={password}
                    onChange={handleAccessCodeChange}
                />
                <button type="submit" onClick={handleSubmit}>Sign in</button>
            </div>
        </div>
    );
}

export default Login;
