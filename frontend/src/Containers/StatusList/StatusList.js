import "./StatusList.scss";

const StatusList = (props) => {
    let { listName, users, changeStatus, showFormForList } = props;

    const Users = () => {
        return (
            <div>
                {users.map((user, index) => (
                    <div className="user" key={index}>
                        <p>
                            {user.first_name} {user.last_name}
                        </p>
                        <button onClick={changeStatus}>{">"}</button>
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
                    <h3>+</h3>
                </button>
            </div>

            {Users()}
        </div>
    );
};

export default StatusList;
