import React from 'react'
import './Landing.scss'
import Login from '../../Containers/Login/Login';

const Landing = (props) => {
    const {setAuthenticated} = props;
    return (
        <div className="landing-page">
            <Login setAuthenticated={setAuthenticated}/>
        </div>
    )
}

export default Landing;
