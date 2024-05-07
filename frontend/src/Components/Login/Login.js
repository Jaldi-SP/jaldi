import React from 'react';
import './Login.scss'; // assuming you are using SASS

const Login = () => {
  return (
    <div className="login-form">
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Access code" />
      <button>Sign in</button>
    </div>
  );
}

export default Login;
