import React from "react";
import { Route, Routes } from "react-router-dom";
import BusinessOwnerApp from "../BusinessOwnerApp";

const experienceRouting = () => (
    <Routes>
        <Route path="/" element={<BusinessOwnerApp />} />
    </Routes>
);

export default experienceRouting;