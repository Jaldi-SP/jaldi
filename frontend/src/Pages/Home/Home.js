import { useState, useEffect } from "react";
import axios from "axios";
import StatusList from "../../Containers/StatusList/StatusList";
import "./Home.scss";
import AddCustomerForm from "../../Components/AddCustomerForm/AddCustomerForm";
import QRCodeComponent from "../../Components/QrCode/QrCode";

const Home = (props) => {
    const {
        companyName,
        setAuthenticated,
        showWaitlist,
        showServing,
        showCompleted,
        showInvalid,
        showSetting,
    } = props;
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

    const changeStatus = async (
        indexToRemove,
        id,
        first_name,
        last_name,
        phone_number,
        currentStatus,
        newStatus
    ) => {
        try {
            const res = await axios.put(`/business`, {
                id,
                first_name,
                last_name,
                phone_number,
                status: newStatus,
            });

            let toMove;
            const updateList = (list, setList) => {
                toMove = list[indexToRemove];
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
                console.error("Invalid user data:", toMove);
                return;
            }

            const addToNewList = (setList) => {
                setList((prevList) => [...prevList, toMove]);
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

    const deleteUser = async (id, currentStatus) => {
        try {
            await axios.delete(`/business`, {
                data: {
                    customer_id: id,
                },
            });
            const updateList = (list, setList) => {
                setList(list.filter((user) => user.id !== id));
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
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="home-page">
            <div className="home-page-info">
                {showWaitlist && (
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
                        deleteUser={(id) => deleteUser(id, "Waitlist")}
                        showFormForList={showFormForList}
                        showWhatsapp={true}
                    />
                )}
                {showServing && (
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
                        deleteUser={(id) => deleteUser(id, "Serving")}
                        showFormForList={showFormForList}
                        showWhatsapp={true}
                    />
                )}
                {showCompleted && (
                    <StatusList
                        listName={"Completed"}
                        users={completed}
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
                                "Completed",
                                "Waitlist"
                            );
                        }}
                        deleteUser={(id) => deleteUser(id, "Completed")}
                        showFormForList={showFormForList}
                        showWhatsapp={true}
                    />
                )}
                {showSetting && (
                    <div>
                        <QRCodeComponent/>
                    </div>
                )}
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
