import StatusList from '../../Containers/StatusList/StatusList';
import './Home.scss';

const Home = () => {
    let homeInfo = {
        companyName: "Geetanjali",
        activeUsers: {
            "waitlist": [
                {
                  firstName: "Sreyas",
                  lastName: "Agarwal",
                  phone_number: "+919876543210"
                },
                {
                  firstName: "Jane",
                  lastName: "Doe",
                  phone_number: "+1234567890"
                },
                {
                  firstName: "John",
                  lastName: "Smith",
                  phone_number: "+0987654321"
                }
            ],
            "serving": [
                {
                    firstName: "Prakarsh",
                    lastName: "Gupta",
                    phone_number: "+919876543210"
                }
            ],
            "completed": [
                {
                    firstName: "Jack",
                    lastName: "Sparrow",
                    phone_number: "+919876543210"
                }
            ]
        }
    }

    return <div className='home-page'>
        <h2>{homeInfo.companyName}</h2>
        <div className='home-page-info'>
            <StatusList listName={"Waitlist"} users={homeInfo.activeUsers.waitlist}/>
            <StatusList listName={"Serving"} users={homeInfo.activeUsers.serving}/>
            <StatusList listName={"Completed"} users={homeInfo.activeUsers.completed}/>
        </div>
    </div>
    
}

export default Home;