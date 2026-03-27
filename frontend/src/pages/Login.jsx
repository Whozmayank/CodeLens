import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/login", form);

            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (


        <div className="login-container">

            <h1 className="heading">🚀 AI Explainer</h1>

            <div className="login-box">
                <h2 className="login-title">Welcome Back 👋</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Email"
                        className="login-input"
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="login-input"
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                    />

                    <button className="login-btn">Login</button>

                </form>

                <p className="login-footer">
                    Don’t have an account?{" "}
                    <Link to="/register">Register</Link>
                </p>
            </div>

        </div>

    );
}