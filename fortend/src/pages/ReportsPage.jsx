import { useEffect, useState } from "react";
import axios from "axios";

export default function ReportsPage() {
  const [report, setReport] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/reports/summary")
      .then(res => setReport(res.data));
  }, []);

  return (
    <div>
      <h2>Report Summary</h2>
      {report.length > 0 && (
        <div>
          <h3>Total Placed: {report[0].totalPlaced}</h3>
          <h3>Highest Package: {report[0].highestPackage} LPA</h3>
		  <h2>Reports Summary</h2>
<p><strong>Total Placed:</strong> {data.totalPlaced}</p>
<p><strong>Highest Package:</strong> {data.highestPackage} LPA</p>
        </div>
      )}
    </div>
  );
}