import { useEffect, useState } from "react";
import axios from "axios";
import "./StatusList.scss";
import addButton from "../../assets/user-add.svg";
import nextButton from "../../assets/next.png";
import whatsappButton from "../../assets/whatsapp-icon.svg";

const StatusList = (props) => {
    let { listName, users, changeStatus, showFormForList, showWhatsapp } =
        props;
    const [userList, setUserList] = useState(users);

    useEffect(() => {
        setUserList(users);
    }, [users]);

    const whatsappNotify = async () => {
        try {
            const res = await axios.post("/notify");
        } catch (err) {
            console.log(err);
        }
    };

    const Users = () => {
        return (
            <div>
                {userList.map((user, index) => (
                    <div className="user" key={index}>
                        <p>
                            {user.first_name} {user.last_name}
                        </p>
                        <div className="button-tray">
                            {showWhatsapp && (
                                <button onClick={whatsappNotify}>
                                    <img
                                        id="whatsapp-button"
                                        src={whatsappButton}
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

            <Users />
        </div>
    );
};

export default StatusList;
