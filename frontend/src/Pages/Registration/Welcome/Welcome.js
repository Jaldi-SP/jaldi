import React, { useState, useEffect } from 'react';
import './Registration.scss';
import axios from 'axios';

const WelcomePage = ({ businessId }) => {
    const [waitingCount, setWaitingCount] = useState(0);
    const [businessDetails, setBusinessDetails] = useState({
        name: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        const fetchBusinessDetails = async () => {
            try {
                const response = await axios.get(`/${businessId}`);
                const { name, email, phone, waitlistCount } = response.data;
                setBusinessDetails({ name, email, phone });
                setWaitingCount(waitlistCount);
            } catch (error) {
                console.error('Error fetching business details:', error);
            }
        };

        fetchBusinessDetails();
    }, [businessId]);

    return (
        <div className="welcome-container">
            <div className="welcome-card">
                <h1>Welcome</h1>
                <p>Business Name: {businessDetails.name}</p>
                <p>Email: {businessDetails.email}</p>
                <p>Phone: {businessDetails.phone}</p>
                <p>People waiting</p>
                <h2>{waitingCount}</h2>
                <button className="register-button">Register now</button>
                <p className="powered-by">Powered by <strong>ezwait</strong></p>
            </div>
        </div>
    );
};

export default WelcomePage;
