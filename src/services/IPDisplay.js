import { useState, useEffect } from "react";
import axios from "axios";
import './IPDisplay.css'; 
import ErrorPage from '../GlobalComponents/ErrorPage';
import { useTheme } from '../contexts/ThemeContext';

const IPDisplay = () => {
    const { theme } = useTheme();
    const [details, setDetails] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const storedIP = localStorage.getItem("userIP");
        if (storedIP) {
            fetchDetails(storedIP);
        } else {
            getUserGeolocationDetails();
        }
    }, []);

    const fetchDetails = (ip) => {
        axios.get(`https://geolocation-db.com/json/${ip}`)
            .then(response => {
                setDetails(response.data);
                setError(false); // Reset error state on successful fetch
            })
            .catch(error => {
                console.error("Error fetching details:", error);
                setError(true);
            });
    };

    const getUserGeolocationDetails = () => {
        axios.get("https://api64.ipify.org?format=json")
            .then(response => {
                const ip = response.data.ip;
                localStorage.setItem("userIP", ip);
                fetchDetails(ip);
            })
            .catch(error => {
                console.error("Error fetching user IP:", error);
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
                                {`${details.city}, ${details.country_name}(${details.country_code})`}
                            </li>
                            <li>
                                IP: {details.IPv4}
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
