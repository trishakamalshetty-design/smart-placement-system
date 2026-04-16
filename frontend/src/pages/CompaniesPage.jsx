import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://smart-placement-system-s4ps.onrender.com";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({
    name: "",
    minCGPA: "",
    packageOffered: ""
  });

  const fetchCompanies = async () => {
    const res = await axios.get(`${API}/api/companies`);
    setCompanies(res.data);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleAdd = async () => {
    await axios.post(`${API}/api/companies`, {
  name: form.name,
  minCgpa: Number(form.minCGPA),      // 👈 small g
  packageOffered: form.packageOffered // 👈 remove Number()
});
	
	
    setForm({ name: "", minCGPA: "", packageOffered: "" });
    fetchCompanies();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/api/companies/${id}`);
    fetchCompanies();
  };

  return (
    <div>
      <h2>🏢 Companies</h2>

      <input
        placeholder="Company Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Minimum CGPA"
        value={form.minCGPA}
        onChange={(e) => setForm({ ...form, minCGPA: e.target.value })}
      />
      <input
        placeholder="Package Offered (number)"
        value={form.packageOffered}
        onChange={(e) => setForm({ ...form, packageOffered: e.target.value })}
      />
      <button onClick={handleAdd}>Add Company</button>

      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Package (LPA)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company._id}>
              <td>{company.name}</td>
              <td>{company.packageOffered}</td>
              <td>
                <button onClick={() => handleDelete(company._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}