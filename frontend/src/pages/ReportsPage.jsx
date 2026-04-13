import { useEffect, useState } from "react";
import axios from "axios";

export default function ReportsPage() {
  const [report, setReport] = useState(null);

  const fetchReport = async () => {
    try {
      const res = await axios.get(
        "https://smart-placement-system-s4ps.onrender.com/api/reports/summary"
      );
      console.log("report:", res.data);
      setReport(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div>
      <h2>Report Summary</h2>

      {!report ? (
        <p>No report data found</p>
      ) : (
        <div>
          <h3>Total Placed: {report.totalPlaced}</h3>
          <h3>Highest Package: {report.highestPackage} LPA</h3>
        </div>
      )}
    </div>
  );
}