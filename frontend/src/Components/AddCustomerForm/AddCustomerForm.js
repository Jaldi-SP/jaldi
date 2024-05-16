import { useState } from 'react';
import './AddCustomerForm.scss';
import ActionButton from './../ActionButton/ActionButton';
import Label from '../Label/Label';
import Input from '../Input/Input';

const AddCustomerForm = (props) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const { listName, showForm, setShowForm } = props;
    const display = showForm ? 'block' : 'none';

    return (
        <div className="add-customer-form" style={{display}}>
            <div className="header">
                <h1>{"Add to " + listName}</h1>
            </div>
            <div className="body">
                <Label text={"First Name"} required={true}/>
                <Input value={firstName} onChange={(value) => setFirstName(value)} placeholder={"Enter First Name"}/>
                
                <Label text={"Last Name"} required={true}/>
                <Input value={lastName} onChange={(value) => setLastName(value)} placeholder={"Enter Last Name"}/>

                <Label text={"Phone Number"} required={true}/>
                <Input value={phoneNumber} onChange={(value) => setPhoneNumber(value)} placeholder={"Enter Phone Number"}/>
            </div>
            <div className="button-tray">
                <ActionButton
                    label="Cancel"
                    onClick={() => setShowForm(false)}
                    id="cancel-button"
                />
                <ActionButton
                    label="Add"
                    onClick={() => setShowForm(false)}
                    id="add-button"
                />
            </div>
        </div>
    );
}

export default AddCustomerForm;
