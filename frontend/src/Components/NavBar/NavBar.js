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
                <button
                    title="Home"
                    className="icon"
                    id="home-icon"
                    onClick={() => {
                        setShowWaitlist(true);
                        setShowServing(true);
                        setShowCompleted(true);
                        setShowInvalid(false);
                    }}
                >
                    <Icon name="home" size={30} color="#2f243aff" />
                </button>
                <button
                    title="Waitlist"
                    className="icon"
                    onClick={() => {
                        setShowWaitlist(true);
                        setShowServing(false);
                        setShowCompleted(false);
                        setShowInvalid(false);
                    }}
                >
                    <Icon name="clock" size={30} color="#2f243aff" />
                </button>
                <button
                    title="Serving"
                    className="icon"
                    onClick={() => {
                        setShowWaitlist(false);
                        setShowServing(true);
                        setShowCompleted(false);
                        setShowInvalid(false);
                    }}
                >
                    <Icon name="loader" size={30} color="#2f243aff" />
                </button>
                <button
                    title="Completed"
                    className="icon"
                    onClick={() => {
                        setShowWaitlist(false);
                        setShowServing(false);
                        setShowCompleted(true);
                        setShowInvalid(false);
                    }}
                >
                    <Icon name="check-square" size={30} color="#2f243aff" />
                </button>
            </div>
            <button title="Logout" className="icon logout-icon" onClick={logout}>
                <Icon name="log-out" size={30} color="#2f243aff" />
            </button>
        </div>
    );
};

export default NavBar;
