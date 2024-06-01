import { useState, useEffect } from "react";
import "./App.scss";
import axios from "axios";
import Home from "./Pages/Home/Home";
import Landing from "./Pages/Landing/Landing";
import NavBar from "./Components/NavBar/NavBar";

function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const [companyName, setCompanyName] = useState("");
    const [showWaitlist, setShowWaitlist] = useState(true);
    const [showServing, setShowServing] = useState(true);
    const [showCompleted, setShowCompleted] = useState(true);
    const [showInvalid, setShowInvalid] = useState(false);

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
            <div className="App">
                <div className="nav-bar-container">
                    <NavBar
                        setAuthenticated={setAuthenticated}
                        setShowWaitlist={setShowWaitlist}
                        setShowServing={setShowServing}
                        setShowCompleted={setShowCompleted}
                        setShowInvalid={setShowInvalid}
                    />
                </div>
                <Home
                    companyName={companyName}
                    setAuthenticated={setAuthenticated}
                    showWaitlist={showWaitlist}
                    showServing={showServing}
                    showCompleted={showCompleted}
                    showInvalid={showInvalid}
                />
            </div>
        );
    } else {
        return (
            <div className="App">
                <Landing setAuthenticated={setAuthenticated} />
            </div>
        );
    }
}

export default App;
