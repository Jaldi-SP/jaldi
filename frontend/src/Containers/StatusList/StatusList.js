import { useState, useEffect } from "react";
import axios from "axios";
import "./StatusList.scss";
import addButton from "../../assets/user-add.svg";
import nextButton from "../../assets/next.png";
import whatsappButton from "../../assets/whatsapp-icon.svg";
import deleteButton from "../../assets/delete.svg";
import NotificationModal from "../../Components/NotificationModal/NotificationModal";

const StatusList = (props) => {
    let {
        listName,
        users,
        changeStatus,
        showFormForList,
        showWhatsapp,
        deleteUser,
    } = props;
    const [userList, setUserList] = useState(users);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationTitle, setNotificationTitle] = useState("");
    const [notificationMessage, setNotificationMessage] = useState("");

    useEffect(() => {
        setUserList(users);
    }, [users]);

    const whatsappNotify = async (phone_number) => {
        try {
            const res = await axios.post("/business/notify", {
                whatsappTo: phone_number,
            });
            setNotificationTitle("Message sent")
            setNotificationMessage("Whatsapp message sent successfully");
            setShowNotification(true);
            console.log(res);
        } catch (err) {
            setNotificationTitle("Something went wrong")
            setNotificationMessage("Failed to send WhatsApp notification.");
            setShowNotification(true);
            console.log(err);
        }
    };

    const handleCloseNotification = () => {
        setShowNotification(false);
    };

    const Users = () => {
        return (
            <div>
                {userList.map((user, index) => (
                    <div className="user" key={index}>
                        <div className="user-info">
                            <p>{user.first_name} {user.last_name}</p>
                            <label>{user.phone_number}</label>
                        </div>
                        <div className="button-tray">
                            {showWhatsapp && (
                                <button
                                    onClick={() => {
                                        whatsappNotify(user.phone_number);
                                    }}
                                >
                                    <img
                                        id="whatsapp-button"
                                        src={whatsappButton}
                                        alt={">"}
                                    />
                                </button>
                            )}
                            {deleteUser && (
                                <button
                                    onClick={() => {
                                        console.log(user.id);
                                        deleteUser(user.id);
                                    }}
                                >
                                    <img
                                        id="delete-button"
                                        src={deleteButton}
                                        alt={">"}
                                    />
                                </button>
                            )}
                            {changeStatus && (
                                <button
                                    onClick={() =>
                                        changeStatus(
                                            index,
                                            user.id,
                                            user.first_name,
                                            user.last_name,
                                            user.phone_number
                                        )
                                    }
                                >
                                    <img
                                        id="next-button"
                                        src={nextButton}
                                        alt={">"}
                                    />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="status-list-container">
            <div className="status-list-header">
                <h3>{listName}</h3>
                <button
                    className="add-to-list-button"
                    onClick={() => showFormForList(listName)}
                >
                    <img src={addButton} alt={"+"} />
                </button>
            </div>
            <div className="user-list">
                <Users />
            </div>
            {showNotification && (
                <NotificationModal
                    title={notificationTitle}
                    message={notificationMessage}
                    onClose={handleCloseNotification}
                />
            )}
        </div>
    );
};

export default StatusList;
