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

    useEffect(() => {
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
        customer_id,
        first_name,
        last_name,
        phone_number,
        status
    ) => {
        try {
            const res = axios.put(`/business`, {
                customer_id,
                first_name,
                last_name,
                phone_number,
                status,
            });
            console.log(res.data);
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
                        customer_id,
                        first_name,
                        last_name,
                        phone_number
                    ) => {
                        changeStatus(
                            customer_id,
                            first_name,
                            last_name,
                            phone_number,
                            "Serving"
                        );
                    }}
                    showFormForList={showFormForList}
                />
                <StatusList
                    listName={"Serving"}
                    users={serving}
                    changeStatus={(
                        customer_id,
                        first_name,
                        last_name,
                        phone_number
                    ) => {
                        changeStatus(
                            customer_id,
                            first_name,
                            last_name,
                            phone_number,
                            "Completed"
                        );
                    }}
                    showFormForList={showFormForList}
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
            />
        </div>
    );
};

export default Home;
