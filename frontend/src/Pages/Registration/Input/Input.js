import React, { useState, useEffect } from "react";
import "./Input.scss";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
    const { businessId } = useParams();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [businessDetails, setBusinessDetails] = useState({
        name: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        const fetchBusinessDetails = async () => {
            try {
                const response = await axios.get(`/business/${businessId}`);
                const { name, email, phone } = response.data;
                setBusinessDetails({ name, email, phone });
            } catch (error) {
                console.error("Error fetching business details:", error);
            }
        };

        fetchBusinessDetails();
    }, [businessId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`/customer/${businessId}`, {
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
            });
            console.log(response.data)
            navigate(`/${businessId}/customer/${response.data.id}/confirmation`);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h1>{businessDetails.name}</h1>
                <h2>Enter your details</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        First Name *
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            required
                        />
                    </label>
                    <label>
                        Last Name *
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            required
                        />
                    </label>
                    <label>
                        Phone Number *
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Phone Number"
                            required
                        />
                    </label>
                    <button type="submit" className="join-button">
                        Join the line
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
