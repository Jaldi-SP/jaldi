import "./NavBar.scss";
import Icon from "../Icon/Icon";
import axios from "axios";

const NavBar = ({
    setAuthenticated,
    setShowWaitlist,
    setShowServing,
    setShowCompleted,
    setShowInvalid,
}) => {
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
                <span
                    className="icon"
                    onClick={() => {
                        setShowWaitlist(true);
                        setShowServing(true);
                        setShowCompleted(true);
                        setShowInvalid(false);
                    }}
                >
                    <Icon name="home" size={30} color="#2f243aff" />
                </span>
                <span
                    className="icon"
                    onClick={() => {
                        setShowWaitlist(true);
                        setShowServing(false);
                        setShowCompleted(false);
                        setShowInvalid(false);
                    }}
                >
                    <Icon name="clock" size={30} color="#2f243aff" />
                </span>
                <span
                    className="icon"
                    onClick={() => {
                        setShowWaitlist(false);
                        setShowServing(true);
                        setShowCompleted(false);
                        setShowInvalid(false);
                    }}
                >
                    <Icon name="loader" size={30} color="#2f243aff" />
                </span>
                <span
                    className="icon"
                    onClick={() => {
                        setShowWaitlist(false);
                        setShowServing(false);
                        setShowCompleted(true);
                        setShowInvalid(false);
                    }}
                >
                    <Icon name="check-square" size={30} color="#2f243aff" />
                </span>
            </div>
            <span className="logout-icon" onClick={logout}>
                <Icon name="log-out" size={30} color="#2f243aff" />
            </span>
        </div>
    );
};

export default NavBar;
