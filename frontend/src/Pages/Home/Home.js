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

    const changeStatus = async (
        indexToRemove,
        customer_id,
        first_name,
        last_name,
        phone_number,
        currentStatus,
        newStatus
    ) => {
        try {
            const res = await axios.put(`/business`, {
                id: customer_id,
                first_name,
                last_name,
                phone_number,
                status: newStatus
            });
            var toMove = {};
            switch (currentStatus) {
                case "Waitlist":
                    toMove = waitlist[indexToRemove];
                    const newWaitlist = waitlist.filter(
                        (_, index) => index !== indexToRemove
                    );
                    setWaitlist(newWaitlist);
                    break;
                case "Serving":
                    toMove = serving[indexToRemove];
                    const newServing = serving.filter(
                        (_, index) => index !== indexToRemove
                    );
                    setServing([newServing]);
                    break;
                case "Completed":
                    toMove = completed[indexToRemove];
                    const newCompleted = completed.filter(
                        (_, index) => index !== indexToRemove
                    );
                    setCompleted(newCompleted);
                    break;
                default:
                    return;
            }

            switch (newStatus) {
                case "Waitlist":
                    setWaitlist([...waitlist, toMove]);
                    break;
                case "Serving":
                    setServing([...serving, toMove]);
                    break;
                case "Completed":
                    setCompleted([...completed, toMove]);
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
