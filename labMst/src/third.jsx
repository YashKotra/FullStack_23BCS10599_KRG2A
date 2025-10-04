import React, { useState } from "react";

function FormWithTable() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [records, setRecords] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !course) return; 

    const newRecord = { name, email, course };
    setRecords([...records, newRecord]);
    setName("");
    setEmail("");
    setCourse("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Course Registration</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />
        <input
          type="text"
          placeholder="Enter Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <br /><br />
        <button type="submit">Submit</button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{record.name}</td>
              <td>{record.email}</td>
              <td>{record.course}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormWithTable;
