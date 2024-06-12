import React, { useState, useEffect } from "react";
import "./ConfirmationPage.scss";
import { useParams } from "react-router-dom";
import axios from "axios";

const ConfirmationPage = () => {
    const { businessId, customerId } = useParams();
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
                const { name, email, phone, people_waiting } = response.data;
                setBusinessDetails({
                    name,
                    email,
                    phone,
                    waitingCount: people_waiting,
                });
            } catch (error) {
                console.error("Error fetching business details:", error);
            }
        };

        fetchBusinessDetails();
    }, [businessId]);
    return (
        <div className="confirmation-container">
            <div className="confirmation-card">
                <h1>{businessDetails.name}</h1>
                <div className="checkmark-circle">✔️</div>
                <h2>Thanks for waiting!</h2>
                <p>Stay on this page to get notified when it's your turn.</p>
                <div className="line-info">
                    <div>
                        <p>Place in line</p>
                        <p>
                            <strong>{businessDetails.waitingCount}</strong>
                        </p>
                    </div>
                </div>
                <div className="user-details">
                    <p>
                        <strong>Name</strong>
                        <br />
                        {userDetails.name}
                    </p>
                    <p>
                        <strong>Phone</strong>
                        <br />
                        {userDetails.phone}
                    </p>
                    <p>
                        <strong>Note</strong>
                        <br />
                        lorem ipsum dolor sit amet, consectetur
                    </p>
                </div>
                <div className="actions">
                    <button>Leave waitlist</button>
                </div>
                <p className="powered-by">
                    Powered by <strong>ezwait</strong>
                </p>
            </div>
        </div>
    );
};

export default ConfirmationPage;
