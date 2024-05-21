import "./StatusList.scss";
import addButton from "../../assets/user-add.svg";

const StatusList = (props) => {
    let { listName, users, changeStatus, showFormForList } = props;

    const Users = () => {
        return (
            <div>
                {users.map((user, index) => (
                    <div className="user" key={user.id}>
                        <p>
                            {user.first_name} {user.last_name}
                        </p>
                        {changeStatus && (
                            <button
                                onClick={() =>
                                    changeStatus(
                                        user.id,
                                        user.first_name,
                                        user.last_name,
                                        user.phone_number
                                    )
                                }
                            >
                                {">"}
                            </button>
                        )}
                        {/* <p>Phone Number: {user.phone_number}</p> */}
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
                    <img src={addButton} alt={"+"}/>
                </button>
            </div>

            {Users()}
        </div>
    );
};

export default StatusList;
