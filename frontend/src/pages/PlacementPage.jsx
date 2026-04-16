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
    packageOffered: "",
    status: "selected"
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const s = await axios.get(`${API}/api/students`);
    const c = await axios.get(`${API}/api/companies`);
    const p = await axios.get(`${API}/api/placements`);

    setStudents(s.data);
    setCompanies(c.data);
    setPlacements(p.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addPlacement = async () => {
    if (!form.studentId || !form.companyId || !form.packageOffered) {
      alert("Fill all fields");
      return;
    }

    await axios.post(`${API}/api/placements`, {
      ...form,
      packageOffered: Number(form.packageOffered)
    });

    setForm({
      studentId: "",
      companyId: "",
      packageOffered: "",
      status: "selected"
    });

    loadData();
  };

  return (
    <div>
      <h2>🎯 Placement System</h2>

      {/* FORM */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        {/* STUDENT */}
        <select
          name="studentId"
          value={form.studentId}
          onChange={handleChange}
        >
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>

        {/* COMPANY */}
        <select
          name="companyId"
          value={form.companyId}
          onChange={handleChange}
        >
          <option value="">Select Company</option>
          {companies.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* PACKAGE */}
        <input
          type="number"
          name="packageOffered"
          placeholder="Package (LPA)"
          value={form.packageOffered}
          onChange={handleChange}
        />

        {/* STATUS */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="selected">Selected</option>
          <option value="rejected">Rejected</option>
        </select>

        <button onClick={addPlacement}>Add Placement</button>
      </div>

      {/* TABLE */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Student</th>
            <th>Company</th>
            <th>Package</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {placements.length === 0 ? (
            <tr>
              <td colSpan="4">No placements found</td>
            </tr>
          ) : (
            placements.map((p) => (
              <tr key={p._id}>
                <td>{p.studentId?.name}</td>
                <td>{p.companyId?.name}</td>
                <td>{p.packageOffered} LPA</td>
                <td>{p.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}