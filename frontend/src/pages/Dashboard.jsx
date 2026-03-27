import { useEffect, useState } from "react";
import API from "../services/api";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar.jsx";

export default function Dashboard() {
    const [code, setCode] = useState("");
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    //  Fetch history
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await API.get("/history");
                setHistory(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchHistory();
    }, []);


    // clear input and result
    const handleClear = () => {
        setCode("");
        setResult(null);
    };

    // delete history item
    const handleDelete = async (id) => {
        try {
            await API.delete(`/history/${id}`);

            // update UI immediately
            setHistory((prev) => prev.filter((item) => item._id !== id));

        } catch (err) {
            console.error(err);
        }
    };

    //  Explain code
    const handleExplain = async () => {
        if (!code.trim()) return;

        try {
            setLoading(true);

            const res = await API.post("/ai/explain", {
                code,
                level: "beginner",
            });

            setResult(res.data);

            // refresh history
            const updated = await API.get("/history");
            setHistory(updated.data);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    //  Copy result
    const handleCopy = () => {
        if (!result) return;
        navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    };


    return (
        <>
            <Navbar />
            <div className="dashboard">

                {/* Sidebar */}
                <div className="sidebar">
                    <h2>History</h2>

                    {history.map((item) => (
                        <div
                            key={item._id}
                            className="history-item"
                            onClick={() => {
                                setCode(item.code);
                                setResult(item.response);
                            }}
                        >
                            <p>{item.code.slice(0, 40)}...</p>
                            <button
                                className="delete-btn"
                                onClick={() => handleDelete(item._id)}
                            >
                                ❌
                            </button>
                        </div>
                    ))}
                </div>

                {/* Main */}
                <div className="main">
                    <div className="header">
                        <h1 className="title">AI Code Explainer</h1>

                    </div>
                    {/* Input */}
                    <textarea
                        className="code-input"
                        rows="8"
                        placeholder="Paste your code here..."
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />

                    {/* Button */}
                    <button className="explain-btn" onClick={handleExplain}>
                        Explain
                    </button>

                    <button className="clear-btn" onClick={handleClear}>
                        Clear
                    </button>
                    {/* Loader */}
                    {loading && <p className="loader">🔍 Analyzing...</p>}

                    {/* Result */}
                    {result && (
                        <div className="result ">

                            <button className="copy-btn" onClick={handleCopy}>
                                Copy
                            </button>

                            <div className="section">
                                <h3>Summary</h3>
                                <p>{result.summary}</p>
                            </div>

                            <div className="section">
                                <h3>Line by Line</h3>
                                <div className="line-text">
                                    {result.lineByLine}
                                </div>
                            </div>

                            <div className="section">
                                <h3>Complexity</h3>
                                <p>{result.complexity}</p>
                            </div>

                            <div className="section">
                                <h3>Tips</h3>
                                <p>{result.tips}</p>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </>
    );
}