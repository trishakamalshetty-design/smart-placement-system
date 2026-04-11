import { useEffect, useState } from "react";
import axios from "axios";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = () => {
    axios
      .get("http://localhost:5000/api/companies")
      .then((res) => setCompanies(res.data));
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const deleteCompany = async (id) => {
    await axios.delete(`http://localhost:5000/api/companies/${id}`);
    fetchCompanies();
  };

  return (
    <div>
      <h2>Companies</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Package (LPA)</th>
            <th>Drive Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {companies.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.location}</td>
              <td>{c.packageOffered}</td>
              <td>{new Date(c.driveDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => deleteCompany(c._id)}>
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