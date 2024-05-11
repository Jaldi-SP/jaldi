import React from 'react'
import './Landing.scss'
import Login from '../../Containers/Login/Login';

const Landing = (props) => {
    const {setAuthenticated} = props;
    return (
        <div className="landing-page">
            <div className='landing-background'></div>
            <div className='login-container'>
                <Login setAuthenticated={setAuthenticated}/>
            </div>
        </div>
    )
}

export default Landing;
