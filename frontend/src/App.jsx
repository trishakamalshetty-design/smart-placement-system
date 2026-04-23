import campus from "./assets/ngit-campus.jpeg";
import logo from "./assets/ngit-logo.png";

import "./App.css";

import Dashboard from "./pages/Dashboard";
import StudentsPage from "./pages/StudentsPage";
import CompaniesPage from "./pages/CompaniesPage";
import PlacementPage from "./pages/PlacementPage";
import ReportsPage from "./pages/ReportsPage";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";

<Route path="/login" element={<LoginPage />} />


import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default function App() {
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <BrowserRouter>
      <div style={{ fontFamily: "Arial", background: "#f2f4f8", minHeight: "100vh" }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", background: "white", paddingBottom: "10px" }}>
          <img
            src={campus}
            alt="NGIT Campus"
            style={{ width: "100%", height: "260px", objectFit: "cover" }}
          />

          <img
            src={logo}
            alt="NGIT Logo"
            style={{
              width: "120px",
              marginTop: "-60px",
              background: "white",
              padding: "10px",
              borderRadius: "50%",
              boxShadow: "0 6px 15px rgba(0,0,0,0.3)"
            }}
          />

          <h1 style={{ marginTop: "10px", fontSize: "34px", fontWeight: "bold" }}>
            🎓 Smart Placement System
          </h1>

          <p style={{ color: "#666", marginBottom: "10px" }}>
            NGIT - Placement Management Portal
          </p>

          {role && (
            <button onClick={logout} style={logoutBtn}>
              Logout
            </button>
          )}
        </div>

        {/* NAVBAR (only after login) */}
        {role && (
          <div style={navBar}>
            <Link style={navStyle} to="/">Students</Link>
            <Link style={navStyle} to="/companies">Companies</Link>
            <Link style={navStyle} to="/placement">Placement</Link>
            <Link style={navStyle} to="/reports">Reports</Link>
            <Link style={navStyle} to="/dashboard">Dashboard</Link>
          </div>
        )}

        {/* CONTENT */}
        <div style={contentBox}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route path="/" element={
              <PrivateRoute><StudentsPage /></PrivateRoute>
            } />

            <Route path="/companies" element={
              <PrivateRoute><CompaniesPage /></PrivateRoute>
            } />

            <Route path="/placement" element={
              <PrivateRoute><PlacementPage /></PrivateRoute>
            } />

            <Route path="/reports" element={
              <PrivateRoute><ReportsPage /></PrivateRoute>
            } />

            <Route path="/dashboard" element={
              <PrivateRoute><Dashboard /></PrivateRoute>
            } />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

const navBar = {
  display: "flex",
  justifyContent: "center",
  gap: "18px",
  padding: "14px",
  background: "#111",
  borderRadius: "12px",
  margin: "15px 20px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
};

const navStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
  padding: "8px 14px",
  borderRadius: "8px"
};

const contentBox = {
  margin: "20px",
  padding: "25px",
  borderRadius: "16px",
  background: "white",
  boxShadow: "0 10px 25px rgba(0,0,0,0.12)"
};

const logoutBtn = {
  marginTop: "10px",
  padding: "8px 16px",
  borderRadius: "8px",
  border: "none",
  background: "#e74c3c",
  color: "white",
  cursor: "pointer"
};