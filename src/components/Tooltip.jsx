import { useState, useEffect, useRef } from "react";
import "../styles/components/tooltip.css";

const Tooltip = ({ info, width = "200px" }) => { 
    const [showInfo, setShowInfo] = useState(false);
    const tooltipRef = useRef(null);

    const toggleInfo = () => {
        setShowInfo(!showInfo);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
                setShowInfo(false);
            }
        };

        if (showInfo) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showInfo]);

    return (
        <div className="tooltip-container">
            <span className="tooltip-icon" onClick={toggleInfo}>
                i
            </span>

            {showInfo && (
                <div
                    ref={tooltipRef}
                    className={`tooltip ${showInfo ? "visible" : ""}`}
                    style={{ width: width }}
                >
                    {info}
                </div>
            )}
        </div>
    );
};

export default Tooltip;