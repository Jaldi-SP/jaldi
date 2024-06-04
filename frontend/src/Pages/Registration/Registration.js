import React, { useState, useEffect } from 'react';
import './WelcomePage.css';
import axios from 'axios';

const WelcomePage = () => {
    const [waitingCount, setWaitingCount] = useState(0);

    useEffect(() => {
        const fetchWaitingCount = async () => {
            try {
                const response = await axios.get('/api/waitlist/count');
                setWaitingCount(response.data.waitlistCount);
            } catch (error) {
                console.error('Error fetching waiting count:', error);
            }
        };

        fetchWaitingCount();
    }, []);

    return (
        <div className="welcome-container">
            <div className="welcome-card">
                <h1>Welcome</h1>
                <p>People waiting</p>
                <h2>{waitingCount}</h2>
                <button className="register-button">Register now</button>
                <p className="powered-by">Powered by <strong>Waitwhile</strong></p>
            </div>
        </div>
    );
};

export default WelcomePage;
