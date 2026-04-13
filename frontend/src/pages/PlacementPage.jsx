import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://smart-placement-system-s4ps.onrender.com";

export default function PlacementPage() {
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [placements, setPlacements] = useState([]);

  const [form, setForm] = useState({
    studentId: "",
    companyId: "",
    status: "selected",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const s = await axios.get(`${API}/api/students`);
    const c = await axios.get(`${API}/api/companies`);
    const p = await axios.get(`${API}/api/placements`);

    console.log("Students:", s.data);
    console.log("Companies:", c.data);

    setStudents(s.data);
    setCompanies(c.data);
    setPlacements(p.data);
  };

  const addPlacement = async () => {
    if (!form.studentId || !form.companyId) {
      alert("Select both");
      return;
    }

    await axios.post(`${API}/api/placements`, form);

    setForm({ studentId: "", companyId: "", status: "selected" });
    loadData();
  };

  return (
    <div>
      <h2>🎯 Placement System</h2>

      <p>Students: {students.length} | Companies: {companies.length}</p>

      <select
        value={form.studentId}
        onChange={(e) => setForm({ ...form, studentId: e.target.value })}
      >
        <option value="">Select Student</option>
        {students.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>

      <select
        value={form.companyId}
        onChange={(e) => setForm({ ...form, companyId: e.target.value })}
      >
        <option value="">Select Company</option>
        {companies.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <button onClick={addPlacement}>Add Placement</button>

      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Student</th>
            <th>Company</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {placements.map((p) => (
            <tr key={p._id}>
              <td>{p.studentId?.name}</td>
              <td>{p.companyId?.name}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}