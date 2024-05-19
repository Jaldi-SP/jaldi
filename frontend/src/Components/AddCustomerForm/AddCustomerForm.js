import { useState, useEffect } from "react";
import axios from "axios";
import "./AddCustomerForm.scss";
import ActionButton from "./../ActionButton/ActionButton";
import Label from "../Label/Label";
import Input from "../Input/Input";

const AddCustomerForm = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [animationClass, setAnimationClass] = useState("");
    const [display, setDisplay] = useState("none");

    const { listName, showForm, setShowForm } = props;

    useEffect(() => {
        if (showForm) {
            setDisplay("block");
            setTimeout(() => setAnimationClass("slide-in"), 10); // Small delay to ensure the display change is registered
        } else {
            setAnimationClass("slide-out");
            setTimeout(() => setDisplay("none"), 500); // Matches the duration of the transition
        }
    }, [showForm]);

    const handleAddCustomer = async () => {
        try {
            const res = await axios.post("/business", {
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
                status: listName,
            });
            console.log(res.data);
            setFirstName("");
            setLastName("");
            setPhoneNumber("");
            setShowForm(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={`add-customer-form ${animationClass}`} style={{ display }}>
            <div className="header">
                <h1>{"Add to " + listName}</h1>
            </div>
            <div className="body">
                <Label text={"First Name"} required={true} />
                <Input
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    placeholder={"Enter First Name"}
                />

                <Label text={"Last Name"} required={true} />
                <Input
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    placeholder={"Enter Last Name"}
                />

                <Label text={"Phone Number"} required={true} />
                <Input
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    placeholder={"Enter Phone Number"}
                />
            </div>
            <div className="button-tray">
                <ActionButton
                    label="Cancel"
                    onClick={() => setShowForm(false)}
                    id="cancel-button"
                />
                <ActionButton
                    label="Add"
                    onClick={handleAddCustomer}
                    id="add-button"
                />
            </div>
        </div>
    );
};

export default AddCustomerForm;
