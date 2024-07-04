import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import './IPDisplay.css'; 
import ErrorPage from '../GlobalComponents/ErrorPage';
import { useTheme } from '../contexts/ThemeContext';

const IPDisplay = () => {
    const { theme } = useTheme();
    const [details, setDetails] = useState(null);
    const [error, setError] = useState(false);
    const getUserGeolocationDetails = useCallback(() => {
        axios.get("https://api64.ipify.org?format=json")
            .then(response => {
                const ip = response.data.ip;
                console.log("User IP:", ip); // Debug
                localStorage.setItem("userIP", ip);
                fetchDetails(ip);
            })
            .catch(error => {
                console.error("Error fetching user IP:", error);
                setError(true);
            });
    }, []);  // Empty dependency array if it doesn't depend on any props or state
    
    useEffect(() => {
        const storedIP = localStorage.getItem("userIP");
        if (storedIP) {
            fetchDetails(storedIP);
        } else {
            getUserGeolocationDetails();  // Now, useCallback ensures stable reference
        }
    }, [getUserGeolocationDetails]);
    

    const fetchDetails = (ip) => {
        axios.get(`https://ipinfo.io/${ip}/json?token=55448e1353a742`)
            .then(response => {
                setDetails(response.data);
                setError(false); // Reset error state on successful fetch
            })
            .catch(error => {
                console.error("Error fetching details:", error);
                setError(true);
            });
    };

    return (
        <div className={`ip-display-container ${theme}`}>
            <div className={`ip-details-box ${theme}`}>
                {error ? <ErrorPage message={"Connection Error"}/> 
                : details ? (
                    <div className="details">
                        <ul>
                            <li>
                                Location :{" "}
                                {`${details.city}, ${details.region}, ${details.country} (${details.countryCode})`}
                            </li>
                            <li>
                                IP: {details.ip}
                            </li>
                        </ul>
                    </div>
                ) : (
                    <button className="find-button" onClick={getUserGeolocationDetails}>
                        Find my details
                    </button>
                )}
            </div>
        </div>
    );
};

export default IPDisplay;
