import React, { useState, useEffect } from "react";
import "./Welcome.scss";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const WelcomePage = () => {
    const { businessId } = useParams();
    const history = useHistory();
    const [waitingCount, setWaitingCount] = useState(0);
    const [businessDetails, setBusinessDetails] = useState({
        name: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        const fetchBusinessDetails = async () => {
            try {
                const response = await axios.get(`/customer/${businessId}`);
                const { name, email, phone, people_waiting } = response.data;
                setBusinessDetails({ name, email, phone });
                setWaitingCount(people_waiting);
            } catch (error) {
                console.error("Error fetching business details:", error);
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
                <p>People waiting: {waitingCount}</p>
                <h2>{waitingCount}</h2>
                <button onClick={()=>{history.push(`/${businessId}/customer/input`)}} className="register-button">Register now</button>
                <p className="powered-by">
                    Powered by <strong>ezwait</strong>
                </p>
            </div>
        </div>
    );
};

export default WelcomePage;
