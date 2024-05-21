import { useState, useEffect } from "react";
import "./App.scss";
import axios from "axios";
import Home from "./Pages/Home/Home";
import Landing from "./Pages/Landing/Landing";

function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const [companyName, setCompanyName] = useState("");

    useEffect(() => {
        const checkUserAuthentication = async () => {
            try {
                const response = await axios.get("/auth/getUser");
                setCompanyName(response.data.name);
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
                <Home companyName={companyName} setAuthenticated={setAuthenticated} />
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
