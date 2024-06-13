import React, { useState, useEffect } from "react";
import "./Welcome.scss";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const WelcomePage = () => {
    const { businessId } = useParams();
    const navigate = useNavigate();
    const [businessDetails, setBusinessDetails] = useState({
        name: "",
        email: "",
        phone: "",
        waitingCount: 0,
    });

    useEffect(() => {
        const fetchBusinessDetails = async () => {
            try {
                const response = await axios.get(`/customer/${businessId}`);
                const { name, phone_number, email, people_waiting } = response.data;
                setBusinessDetails({
                    name,
                    phone: phone_number,
                    email,
                    waitingCount: people_waiting,
                });
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
                <p>People waiting:</p>
                <h2>{businessDetails.waitingCount}</h2>
                <button
                    onClick={() => {
                        navigate(`/${businessId}/customer/input`);
                    }}
                    className="register-button"
                >
                    Register now
                </button>
                <p className="powered-by">
                    Powered by <strong>ezwait</strong>
                </p>
            </div>
        </div>
    );
};

export default WelcomePage;
