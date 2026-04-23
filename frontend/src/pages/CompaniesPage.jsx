import { useEffect, useState } from "react";
import API from "../api";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);

  const [form, setForm] = useState({
    name: "",
    location: "",
    packageOffered: "",
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await API.get("/companies");
      setCompanies(res.data);
    } catch (err) {
      alert("Error loading companies");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addCompany = async () => {
    try {
      await API.post("/companies", form);
      fetchCompanies();

      setForm({ name: "", location: "", packageOffered: "" });
    } catch (err) {
      alert("Only admin can add company");
    }
  };

  const deleteCompany = async (id) => {
    try {
      await API.delete(`/companies/${id}`);
      setCompanies(companies.filter((c) => c._id !== id));
    } catch (err) {
      alert("Delete failed (admin only)");
    }
  };

  return (
    <div>
      <h2>🏢 Companies</h2>

      <div style={box}>
        <input name="name" placeholder="Name" onChange={handleChange} value={form.name} />
        <input name="location" placeholder="Location" onChange={handleChange} value={form.location} />
        <input name="packageOffered" placeholder="Package" onChange={handleChange} value={form.packageOffered} />

        <button onClick={addCompany}>Add</button>
      </div>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Package</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {companies.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.location}</td>
              <td>{c.packageOffered}</td>
              <td>
                <button onClick={() => deleteCompany(c._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const box = { display: "flex", gap: "10px", flexWrap: "wrap" };