import "./NavBar.scss";
import Icon from "../Icon/Icon";
import axios from "axios";
import { useState } from "react";

const NavBar = ({
    setAuthenticated,
    setShowWaitlist,
    setShowServing,
    setShowCompleted,
    setShowInvalid,
    setShowSetting,
    setShowCustomerDirectory,
}) => {
    const [showMenu, setShowMenu] = useState(false);
    const logout = async () => {
        try {
            const res = axios.post(`/auth/logout`);
            setAuthenticated(false);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="nav-bar">
            <div className="button-routes">
                <button
                    title="Home"
                    className="icon"
                    id="home-icon"
                    onClick={() => {
                        setShowWaitlist(true);
                        setShowServing(true);
                        setShowCompleted(true);
                        setShowInvalid(false);
                        setShowSetting(false);
                        setShowCustomerDirectory(false);
                    }}
                >
                    <Icon name="home" size={30} color="#13293dff" />
                </button>
                <button
                    title="Waitlist"
                    className="icon"
                    onClick={() => {
                        setShowWaitlist(true);
                        setShowServing(false);
                        setShowCompleted(false);
                        setShowInvalid(false);
                        setShowSetting(false);
                        setShowCustomerDirectory(false);
                    }}
                >
                    <Icon name="clock" size={30} color="#13293dff" />
                </button>
                <button
                    title="Serving"
                    className="icon"
                    onClick={() => {
                        setShowWaitlist(false);
                        setShowServing(true);
                        setShowCompleted(false);
                        setShowInvalid(false);
                        setShowSetting(false);
                        setShowCustomerDirectory(false);
                    }}
                >
                    <Icon name="loader" size={30} color="#13293dff" />
                </button>
                <button
                    title="Completed"
                    className="icon"
                    onClick={() => {
                        setShowWaitlist(false);
                        setShowServing(false);
                        setShowCompleted(true);
                        setShowInvalid(false);
                        setShowSetting(false);
                        setShowCustomerDirectory(false);
                    }}
                >
                    <Icon name="check-square" size={30} color="#13293dff" />
                </button>
                <button
                    title="Directory"
                    className="icon"
                    id="directory-icon"
                    onClick={() => {
                        setShowWaitlist(false);
                        setShowServing(false);
                        setShowCompleted(false);
                        setShowInvalid(false);
                        setShowSetting(false);
                        setShowCustomerDirectory(true);
                    }}
                >
                    <Icon name="user" size={30} color="#13293dff" />
                </button>
                <button
                    title="Settings"
                    className="icon"
                    id="settings-icon"
                    onClick={() => {
                        setShowWaitlist(false);
                        setShowServing(false);
                        setShowCompleted(false);
                        setShowInvalid(false);
                        setShowSetting(true);
                        setShowCustomerDirectory(false);
                    }}
                >
                    <Icon name="settings" size={30} color="#13293dff" />
                </button>
                <button
                    title="Menu"
                    className="icon"
                    id="menu-icon"
                    onClick={() => {
                        setShowMenu(true);
                        setShowWaitlist(false);
                        setShowServing(false);
                        setShowCompleted(false);
                        setShowInvalid(false);
                        setShowSetting(false);
                        setShowCustomerDirectory(false);
                    }}
                >
                    <Icon name="menu" size={30} color="#13293dff" />
                </button>
            </div>
            <button
                title="Logout"
                className="icon logout-icon"
                id="logout-icon"
                onClick={logout}
            >
                <Icon name="log-out" size={30} color="#FF0000" />
            </button>
            {showMenu && (
                <div className="mobile-menu">
                    <button
                        id="close-menu-icon"
                        onClick={() => {
                            setShowMenu(false);
                            setShowWaitlist(true);
                            setShowServing(false);
                            setShowCompleted(false);
                            setShowInvalid(false);
                            setShowSetting(false);
                            setShowCustomerDirectory(false);
                        }}
                    >
                        <Icon name="x" size={30} color="red" />
                    </button>
                    <div className="button-list">
                        <div
                            className="button-list-item"
                            onClick={() => {
                                setShowWaitlist(false);
                                setShowServing(false);
                                setShowCompleted(false);
                                setShowInvalid(false);
                                setShowSetting(false);
                                setShowCustomerDirectory(true);
                                setShowMenu(false);
                            }}
                        >
                            <button>
                                <Icon name="user" size={30} color="white" />
                            </button>
                            <p id="button-list-item-text">Customer Directory</p>
                        </div>
                        <div
                            className="button-list-item"
                            onClick={() => {
                                setShowWaitlist(false);
                                setShowServing(false);
                                setShowCompleted(false);
                                setShowInvalid(false);
                                setShowSetting(true);
                                setShowCustomerDirectory(false);
                                setShowMenu(false);
                            }}
                        >
                            <button>
                                <Icon name="settings" size={30} color="white" />
                            </button>
                            <p id="button-list-item-text">Settings</p>
                        </div>
                        <div className="button-list-item" onClick={logout}>
                            <button>
                                <Icon name="log-out" size={30} color="white" />
                            </button>
                            <p id="button-list-item-text">Logout</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBar;
