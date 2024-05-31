import React from "react";
import "./NotificationModal.scss";
import whatsappButton from "../../assets/whatsapp-icon.svg";

const NotificationModal = ({ title, message, onClose }) => {
    return (
        <div className="notification-modal">
            <div className="notification-content">
                <img
                    src={whatsappButton}
                    alt="Logo"
                    className="modal-logo"
                />
                <h2>{title}</h2>
                <p>{message}</p>
                <button onClick={onClose} className="modal-button">
                    Okay
                </button>
            </div>
        </div>
    );
};

export default NotificationModal;
