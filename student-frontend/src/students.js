import React, { useEffect, useState } from "react";
import API from "./api";
import "./index.css";

function Student() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchStudents = async () => {
    const response = await API.get("/student/details/");
    setStudents(response.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const studentData = {
    name,
    age,
    email,
    course
  };

  try {
    if (editingId) {
      await API.put(`/student/details/${editingId}/`, studentData);
      setEditingId(null);
    } else {
      await API.post("/student/details/", studentData);
    }

    setName("");
    setAge("");
    setEmail("");
    setCourse("");

    fetchStudents();
  } catch (error) {
    console.log(error.response.data);
  }
};

  const handleDelete = async (id) => {
    await API.delete(`/student/details/${id}/`);
    fetchStudents();
  };

  const handleEdit = (student) => {
  setName(student.name);
  setAge(student.age);
  setEmail(student.email);
  setCourse(student.course);
  setEditingId(student.id);
};

  return (
    <div className="page-container">
      <div>
        <h2>Student CRUD</h2>

              <form onSubmit={handleSubmit} className="form-container">
    <div className="form-group">
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
    </div>

    <div className="form-group">
      <label>Age</label>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Enter age"
      />
    </div>

    <div className="form-group">
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
    </div>

    <div className="form-group">
      <label>Course</label>
      <input
        type="text"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        placeholder="Enter course"
      />
    </div>

    <button type="submit" className="submit-btn">
      {editingId ? "Update" : "Create"}
    </button>
  </form>

        <table className="table-container">
    <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Email</th>
        <th>Course</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {students.map((student) => (
        <tr key={student.id}>
          <td>{student.name}</td>
          <td>{student.age}</td>
          <td>{student.email}</td>
          <td>{student.course}</td>
          <td>
            <button className="action-btn edit-btn" onClick={() => handleEdit(student)}>
              Edit
            </button>

            <button className="action-btn delete-btn" onClick={() => handleDelete(student.id)}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
      </div>
  </div>
  );
}

export default Student;