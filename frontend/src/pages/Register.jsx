import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/register", form);

            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");

        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="register-container">

            {/* Logo */}
            <h1 className="app-title">🚀 AI Explainer</h1>

            <div className="register-box">
                <h2 className="register-title">Create Account</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Name"
                        className="register-input"
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="register-input"
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="register-input"
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                    />

                    <button className="register-btn">Register</button>

                </form>

                <p className="register-footer">
                    Already have an account?{" "}
                    <Link to="/">Login</Link>
                </p>
            </div>

        </div>
    );
}