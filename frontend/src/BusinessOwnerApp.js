import { useState, useEffect } from "react";
import "./BusinessOwnerApp.scss";
import axios from "axios";
import Home from "./Pages/Home/Home";
import Landing from "./Pages/Landing/Landing";
import NavBar from "./Components/NavBar/NavBar";

function BusinessOwnerApp() {
    const [authenticated, setAuthenticated] = useState(false);
    const [companyName, setCompanyName] = useState("");
    const [showWaitlist, setShowWaitlist] = useState(true);
    const [showServing, setShowServing] = useState(true);
    const [showCompleted, setShowCompleted] = useState(true);
    const [showInvalid, setShowInvalid] = useState(false);
    const [showSetting, setShowSetting] = useState(false);


    useEffect(() => {
        const checkViewportWidth = () => {
            if (window.innerWidth <= 1190) {
                setShowWaitlist(true);
                setShowServing(false);
                setShowCompleted(false);
                setShowInvalid(false);
                setShowSetting(false);
            } else {
                setShowWaitlist(true);
                setShowServing(true);
                setShowCompleted(true);
                setShowInvalid(false);
                setShowSetting(false);
            }
        };

        checkViewportWidth();

        // Optionally, you can add an event listener to update the state on window resize
        window.addEventListener('resize', checkViewportWidth);

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener('resize', checkViewportWidth);
    }, [authenticated]);

    useEffect(() => {
        const checkUserAuthentication = async () => {
            try {
                const res = await axios.get("/auth/getUser");
                console.log(res);
                setCompanyName(res.data.name);
                setAuthenticated(true);
            } catch (error) {
                console.error("Error checking user authentication:", error);
            }
        };
        checkUserAuthentication();
    }, [authenticated]);

    if (authenticated) {
        return (
            <div className="BusinessOwnerApp">
                <div className="nav-bar-container">
                    <NavBar
                        setAuthenticated={setAuthenticated}
                        setShowWaitlist={setShowWaitlist}
                        setShowServing={setShowServing}
                        setShowCompleted={setShowCompleted}
                        setShowInvalid={setShowInvalid}
                        setShowSetting = {setShowSetting}
                    />
                </div>
                <Home
                    companyName={companyName}
                    setAuthenticated={setAuthenticated}
                    showWaitlist={showWaitlist}
                    showServing={showServing}
                    showCompleted={showCompleted}
                    showInvalid={showInvalid}
                    showSetting={showSetting}
                />
            </div>
        );
    } else {
        return (
            <div className="BusinessOwnerApp">
                <Landing setAuthenticated={setAuthenticated} />
            </div>
        );
    }
}

export default BusinessOwnerApp;
