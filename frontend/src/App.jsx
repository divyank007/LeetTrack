import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import QuestionsPage from "./pages/QuestionsPage"; // Import the new page
import "./App.css";

function App() {
    const [user, setUser] = useState(null);

    const getUser = async () => {
        try {
            const url = `${import.meta.env.VITE_API_URL}/auth/login/success`;
            const { data } = await axios.get(url, { withCredentials: true });
            setUser(data.user);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className="container">
            <Routes>
                <Route
                    exact
                    path="/"
                    element={user ? <Home user={user} /> : <Navigate to="/login" />}
                />
                <Route
                    exact
                    path="/login"
                    element={user ? <Navigate to="/" /> : <Login />}
                />
                <Route
                    path="/signup"
                    element={user ? <Navigate to="/" /> : <Signup />}
                />
                <Route
                    path="/questions"
                    element={user ? <QuestionsPage user={user} /> : <Navigate to="/login" />}
                />
            </Routes>
        </div>
    );
}

export default App;
