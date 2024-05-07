import React from 'react'
import './Landing.scss'
import Login from '../../Components/Login/Login';

const Landing = () => {
    return (
        <div className="landing-page">
            <div className='landing-background'></div>
            <div className='login-container'>
                <Login/>
            </div>
        </div>
    )
}

export default Landing;
