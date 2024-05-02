import './App.css';
import Navbar from './Navbar';
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import ConvertCurrency from './pages/ConvertCurrency'
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <div>
      <Navbar/>
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