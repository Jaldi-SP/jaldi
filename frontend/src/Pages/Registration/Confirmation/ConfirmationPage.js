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
    const [customerDetails, setCustomerDetails] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        position: 0,
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

        const fetchCustomerDetails = async () => {
            try {
                const response = await axios.get(
                    `/customer/${businessId}/visits/${customerId}`
                );
                const { customer } = response.data;
                setCustomerDetails({
                    first_name: customer.first_name,
                    last_name: customer.last_name,
                    phone_number: customer.phone_number,
                    position: customer.position,
                });
            } catch (error) {
                console.error("Error fetching customer details:", error);
            }
        };

        fetchBusinessDetails();
        fetchCustomerDetails();
    }, [businessId, customerId]);

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
                            <strong>{customerDetails.position}</strong>
                        </p>
                    </div>
                    <div>
                        <p>People currently waiting</p>
                        <p>
                            <strong>{businessDetails.waitingCount}</strong>
                        </p>
                    </div>
                </div>
                <div className="user-details">
                    <p>
                        <strong>Name</strong>
                        <br />
                        {customerDetails.first_name} {customerDetails.last_name}
                    </p>
                    <p>
                        <strong>Phone</strong>
                        <br />
                        {customerDetails.phone_number}
                    </p>
                    <p>
                        <strong>Note</strong>
                        <br />
                        Lorem ipsum dolor sit amet, consectetur
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
