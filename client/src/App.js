import "./App.css";
import Navbar from "./pages/dashboard/Navbar";
import Profile from "./pages/profile/Profile";
import Dashboard from "./pages/dashboard/Dashboard";
import ConvertCurrency from "./pages/currency/ConvertCurrency";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <div>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/convert" element={<ConvertCurrency />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
