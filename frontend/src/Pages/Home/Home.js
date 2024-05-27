import { useState, useEffect } from "react";
import axios from "axios";
import StatusList from "../../Containers/StatusList/StatusList";
import "./Home.scss";
import AddCustomerForm from "../../Components/AddCustomerForm/AddCustomerForm";

const Home = (props) => {
    const { companyName, setAuthenticated } = props;
    const [showForm, setShowForm] = useState(false);
    const [showingFormFor, setShowingFormFor] = useState("");
    const [waitlist, setWaitlist] = useState([]);
    const [serving, setServing] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [inactive, setInactive] = useState([]);

    const getBusinessInfo = async () => {
        try {
            const res = await axios.get("/business");
            const { data } = res;
            if (data) {
                setWaitlist(data.Waitlist || []);
                setServing(data.Serving || []);
                setCompleted(data.Completed || []);
                setInactive(data.Inactive || []);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getBusinessInfo();
    }, []);

    const showFormForList = (listName) => {
        setShowingFormFor(listName);
        setShowForm(true);
    };

    const logout = async () => {
        try {
            const res = axios.post(`/auth/logout`);
            setAuthenticated(false);
        } catch (err) {
            console.log(err);
        }
    };

    const changeStatus = async (indexToRemove, id, first_name, last_name, phone_number, currentStatus, newStatus) => {
        try {
            const res = await axios.put(`/business`, {
                id,
                first_name,
                last_name,
                phone_number,
                status: newStatus
            });
    
            let toMove;
            const updateList = (list, setList) => {
                toMove = list[indexToRemove]
                setList(list.filter((_, index) => index !== indexToRemove));
            };
    
            switch (currentStatus) {
                case "Waitlist":
                    updateList(waitlist, setWaitlist);
                    break;
                case "Serving":
                    updateList(serving, setServing);
                    break;
                case "Completed":
                    updateList(completed, setCompleted);
                    break;
                default:
                    return;
            }
 
            if (!toMove || !toMove.first_name || !toMove.last_name) {
                console.error('Invalid user data:', toMove);
                return;
            }
 
            const addToNewList = (setList) => {
                setList(prevList => [...prevList, toMove]);
            };
    
            switch (newStatus) {
                case "Waitlist":
                    addToNewList(setWaitlist);
                    break;
                case "Serving":
                    addToNewList(setServing);
                    break;
                case "Completed":
                    addToNewList(setCompleted);
                    break;
                default:
                    return;
            }
        } catch (err) {
            console.log(err);
        }
    };
    

    return (
        <div className="home-page">
            <button onClick={logout}> Logout </button>
            <h2 id="company-name-title">{companyName}</h2>
            <div className="home-page-info">
                <StatusList
                    listName={"Waitlist"}
                    users={waitlist}
                    changeStatus={(
                        index,
                        customer_id,
                        first_name,
                        last_name,
                        phone_number
                    ) => {
                        changeStatus(
                            index,
                            customer_id,
                            first_name,
                            last_name,
                            phone_number,
                            "Waitlist",
                            "Serving"
                        );
                    }}
                    showFormForList={showFormForList}
                    showWhatsapp={true}
                />
                <StatusList
                    listName={"Serving"}
                    users={serving}
                    changeStatus={(
                        index,
                        customer_id,
                        first_name,
                        last_name,
                        phone_number
                    ) => {
                        changeStatus(
                            index,
                            customer_id,
                            first_name,
                            last_name,
                            phone_number,
                            "Serving",
                            "Completed"
                        );
                    }}
                    showFormForList={showFormForList}
                    showWhatsapp={true}
                /> 
                <StatusList
                    listName={"Completed"}
                    users={completed}
                    showFormForList={showFormForList}
                    showWhatsapp={true}
                    changeStatus={(
                        index,
                        customer_id,
                        first_name,
                        last_name,
                        phone_number
                    ) => {
                        changeStatus( // adding function to change back to serving for testing
                            index,
                            customer_id,
                            first_name,
                            last_name,
                            phone_number,
                            "Completed",
                            "Waitlist"
                        );
                    }}
                />
            </div>
            <AddCustomerForm
                showForm={showForm}
                setShowForm={setShowForm}
                listName={showingFormFor}
                refreshBusinessInfo={getBusinessInfo}
            />
        </div>
    );
};

export default Home;
