import React from "react";
import { Route, Routes } from "react-router-dom";
import BusinessOwnerApp from "../BusinessOwnerApp";
import WelcomePage from "../Pages/Registration/Welcome/Welcome";
import Confirmation from "../Pages/Registration/Confirmation/ConfirmationPage";
import Input from "../Pages/Registration/Input/Input";

const experienceRouting = () => (
    <Routes>
        <Route path="/:businessId/customer/:customerId/confirmation" element={<Confirmation />} />
        <Route path="/:businessId/customer/input" element={<Input />} />
        <Route path="/:businessId/customer" element={<WelcomePage />} />
        <Route path="/" element={<BusinessOwnerApp />} />
    </Routes>
);

export default experienceRouting;
