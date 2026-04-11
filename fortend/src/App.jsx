import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import StudentsPage from "./pages/StudentsPage";
import CompaniesPage from "./pages/CompaniesPage";
import PlacementPage from "./pages/PlacementPage";
import ReportsPage from "./pages/ReportsPage";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        <h1>Smart Placement System</h1>

        <nav style={{ marginBottom: "20px" }}>
          <Link to="/">Students</Link> |{" "}
          <Link to="/companies">Companies</Link> |{" "}
          <Link to="/placement">Placement</Link> |{" "}
          <Link to="/reports">Reports</Link>
        </nav>

        <Routes>
          <Route path="/" element={<StudentsPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/placement" element={<PlacementPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}