import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/students")
      .then(res => {
        console.log("STUDENTS API:", res.data);
        setStudents(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Students</h2>

      {students.length === 0 ? (
        <p>No students found</p>
      ) : (
        students.map((s) => (
          <div key={s._id} style={{border:"1px solid black",margin:"10px",padding:"10px"}}>
            <p>Name: {s.name}</p>
            <p>Course: {s.course}</p>
            <p>Email: {s.email}</p>
            <p>Year: {s.year}</p>
          </div>
        ))
      )}
    </div>
  );
}