import React, { useState } from 'react';
import './Input.scss';

const RegisterPage = ({ businessName, estimatedWait }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

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
                    <p>Estimated wait: <strong>{estimatedWait}</strong></p>
                    <button type="submit" className="join-button">Join the line</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
