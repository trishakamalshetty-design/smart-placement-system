import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://smart-placement-system-s4ps.onrender.com/api/students";
//const API = "http://localhost:5000/api/students";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    branch: "",
    cgpa: "",
    year: "",
    email: "",
    phone: "",
    placementStatus: "pending",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get(API);
    setStudents(res.data);
  };

  const handleChange = (e) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]:
      name === "cgpa" || name === "year"
        ? value === "" ? "" : Number(value)
        : value,
  }));
};

  const addStudent = async () => {
  try {
    await axios.post(API, form);

    await fetchStudents();  // ✅ important

    setForm({
      name: "",
      branch: "",
      cgpa: "",
      year: "",
      email: "",
      phone: "",
      placementStatus: "pending",
    });
  } catch (err) {
    console.log(err);
  }
};

  const deleteStudent = async (id) => {
    await axios.delete(`${API}/${id}`);
    setStudents(students.filter((s) => s._id !== id));
  };

  return (
    <div>
      <h2>🎓 Students</h2>

      {/* FORM */}
      <div style={box}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="branch" placeholder="Branch" value={form.branch} onChange={handleChange} />
        <input name="cgpa" placeholder="CGPA" value={form.cgpa} onChange={handleChange} />
        <input name="year" placeholder="Year" value={form.year} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />

        <select name="placementStatus" value={form.placementStatus} onChange={handleChange}>
          <option value="pending">pending</option>
          <option value="placed">placed</option>
          <option value="rejected">rejected</option>
        </select>

        <button onClick={addStudent}>Add Student</button>
      </div>

      {/* TABLE */}
      <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Branch</th>
            <th>CGPA</th>
            <th>Year</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.branch}</td>
              <td>{s.cgpa}</td>
              <td>{s.year}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td>{s.placementStatus}</td>
              <td>
                <button onClick={() => deleteStudent(s._id)}>Delete</button>
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