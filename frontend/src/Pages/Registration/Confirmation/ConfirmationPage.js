import React from 'react';
import './ConfirmationPage.scss';

const ConfirmationPage = ({ businessName, placeInLine, estimatedWait, userDetails }) => {
    return (
        <div className="confirmation-container">
            <div className="confirmation-card">
                <h1>{businessName}</h1>
                <div className="checkmark-circle">✔️</div>
                <h2>Thanks for waiting!</h2>
                <p>Stay on this page to get notified when it's your turn.</p>
                <div className="line-info">
                    <div>
                        <p>Place in line</p>
                        <p><strong>{placeInLine}</strong></p>
                    </div>
                    <div>
                        <p>Estimated wait</p>
                        <p><strong>{estimatedWait} days</strong></p>
                    </div>
                </div>
                <div className="user-details">
                    <p><strong>Name</strong><br/>{userDetails.name}</p>
                    <p><strong>Phone</strong><br/>{userDetails.phone}</p>
                    <p><strong>Staff</strong><br/>First available (Any)</p>
                </div>
                <div className="actions">
                    <button>Messages</button>
                    <button>Get directions</button>
                    <button>View waitlist</button>
                    <button>Leave waitlist</button>
                </div>
                <p className="powered-by">Powered by <strong>ezwait</strong></p>
            </div>
        </div>
    );
};

export default ConfirmationPage;
