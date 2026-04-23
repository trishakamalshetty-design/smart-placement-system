import { useEffect, useState } from "react";
import API from "../api";

export default function PlacementPage() {
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [placements, setPlacements] = useState([]);

  const [form, setForm] = useState({
    studentId: "",
    companyId: "",
    packageOffered: "",
    status: "selected",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const s = await API.get("/students");
    const c = await API.get("/companies");
    const p = await API.get("/placements");

    setStudents(s.data);
    setCompanies(c.data);
    setPlacements(p.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addPlacement = async () => {
    try {
      await API.post("/placements", form);
      loadData();
      setForm({
        studentId: "",
        companyId: "",
        packageOffered: "",
        status: "selected",
      });
    } catch (err) {
      alert("Only admin can add placement");
    }
  };

  const deletePlacement = async (id) => {
    try {
      await API.delete(`/placements/${id}`);
      setPlacements((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert("Only admin can delete");
    }
  };

  return (
    <div>
      <h2>🎯 Placements</h2>

      <div style={box}>
        <select name="studentId" value={form.studentId} onChange={handleChange}>
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>

        <select name="companyId" value={form.companyId} onChange={handleChange}>
          <option value="">Select Company</option>
          {companies.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="packageOffered"
          placeholder="Package (LPA)"
          value={form.packageOffered}
          onChange={handleChange}
        />

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="selected">Selected</option>
          <option value="rejected">Rejected</option>
        </select>

        <button onClick={addPlacement}>Add Placement</button>
      </div>

      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Student</th>
            <th>Company</th>
            <th>Package</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {placements.map((p) => (
            <tr key={p._id}>
              <td>{p.studentId?.name}</td>
              <td>{p.companyId?.name}</td>
              <td>{p.packageOffered} LPA</td>
              <td>{p.status}</td>
              <td>
                <button onClick={() => deletePlacement(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const box = {
  display: "flex",
  gap: "10px",
  marginBottom: "15px",
  flexWrap: "wrap",
};