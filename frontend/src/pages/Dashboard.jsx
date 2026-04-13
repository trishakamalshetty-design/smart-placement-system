import { useEffect, useState } from "react";
import axios from "axios";
import { FaUserGraduate, FaBuilding, FaChartBar, FaMoneyBill } from "react-icons/fa";

const API = "https://smart-placement-system-s4ps.onrender.com";

export default function Dashboard() {
  const [students, setStudents] = useState(0);
  const [placements, setPlacements] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const s = await axios.get(`${API}/api/students`);
    const p = await axios.get(`${API}/api/placements`);
    const c = await axios.get(`${API}/api/companies`);

    setStudents(s.data.length);
    setPlacements(p.data);
    setCompanies(c.data);
  };

  const totalPlaced = placements.filter(p => p.status === "selected").length;

  const highestPackage = placements.reduce(
    (max, p) => Math.max(max, p.package || 0),
    0
  );

  return (
    <div>
      <h2>📊 Dashboard</h2>

      <div style={gridStyle}>
        <Card icon={<FaUserGraduate />} title="Students" value={students} color="#4f46e5" />
        <Card icon={<FaChartBar />} title="Placed" value={totalPlaced} color="#16a34a" />
        <Card icon={<FaBuilding />} title="Companies" value={companies.length} color="#f59e0b" />
        <Card icon={<FaMoneyBill />} title="Highest Package" value={`${highestPackage} LPA`} color="#ef4444" />
      </div>
    </div>
  );
}

function Card({ icon, title, value, color }) {
  return (
    <div style={{ ...cardStyle, borderTop: `4px solid ${color}` }}>
      <div style={{ fontSize: "22px" }}>{icon}</div>
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
  marginTop: "20px"
};

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  textAlign: "center"
};