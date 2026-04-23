import { useEffect, useState } from "react";
import API from "../api";

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
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      alert("Error loading students (check login or backend)");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addStudent = async () => {
    try {
      await API.post("/students", form);
      fetchStudents();

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
      alert("Only admin can add students OR not logged in");
    }
  };

  const deleteStudent = async (id) => {
    try {
      await API.delete(`/students/${id}`);
      setStudents(students.filter((s) => s._id !== id));
    } catch (err) {
      alert("Delete failed (admin only or auth issue)");
    }
  };

  return (
    <div>
      <h2>🎓 Students</h2>

      <div style={box}>
        <input name="name" placeholder="Name" onChange={handleChange} value={form.name} />
        <input name="branch" placeholder="Branch" onChange={handleChange} value={form.branch} />
        <input name="cgpa" placeholder="CGPA" onChange={handleChange} value={form.cgpa} />
        <input name="year" placeholder="Year" onChange={handleChange} value={form.year} />
        <input name="email" placeholder="Email" onChange={handleChange} value={form.email} />
        <input name="phone" placeholder="Phone" onChange={handleChange} value={form.phone} />

        <button onClick={addStudent}>Add</button>
      </div>

      <table border="1" width="100%">
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

const box = { display: "flex", gap: "10px", flexWrap: "wrap" };