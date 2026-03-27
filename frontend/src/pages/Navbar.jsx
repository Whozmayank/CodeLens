import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="navbar">

            {/* Left */}
            <div className="nav-left">
                <h2 className="logo">AI Explainer</h2>
            </div>

            {/* Right */}
            <div className="nav-right">
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>

        </div>
    );
}