import React, { useState, useEffect } from "react";
import "./Input.scss";
import { useParams, useHistory } from "react-router-dom";

const RegisterPage = () => {
    const { businessId } = useParams();
    const history = useHistory();

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchBusinessDetails = async () => {
            try {
                const response = await axios.get(`/business/${businessId}`);
                const { name, email, phone, people_waiting } = response.data;
                setName(name);
                setPhoneNumber(phone);
                setEmail(email)

                setWaitingCount(people_waiting);
            } catch (error) {
                console.error("Error fetching business details:", error);
            }
        };

        fetchBusinessDetails();
    }, [businessId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your form submission logic here
        console.log({ name, phoneNumber, email });
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h1>{businessName}</h1>
                <h2>Enter your details</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name *
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            required
                        />
                    </label>
                    <label>
                        Phone number
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Phone number"
                            required
                        />
                    </label>
                    <label>
                        Email
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </label>
                    <p>
                        Estimated wait: <strong>{estimatedWait}</strong>
                    </p>
                    <button type="submit" className="join-button">
                        Join the line
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
