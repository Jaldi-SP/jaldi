import './StatusList.scss'

const StatusList = (props) => {
    let {listName, users} = props;

    const Users = () => {
        return (
          <div>
            {users.map((user, index) => (
              <div className="user" key={index}>
                <p>{user.firstName} {user.lastName}</p>
                <p>Phone Number: {user.phone_number}</p>
              </div>
            ))}
          </div>
        );
      }

    return (
        <div className='status-list-container'>
            <div className='status-list-header'>
                <h3>{listName}</h3>
                <button>+</button>
            </div>
            
            {Users()}
        </div>
    )
}

export default StatusList