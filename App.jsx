import { useEffect, useState } from "react";
import "./App.css";

const API = "https://student-management-system-1-4hdc.onrender.com";

function App() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [skill, setSkill] = useState("");

  // Get All Students
  const getStudents = async () => {
    try {
      const response = await fetch(`${API}/students`);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  // Add Student
  const addStudent = async () => {
    if (!name || !college || !skill) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(`${API}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          college,
          skill,
        }),
      });

      if (response.ok) {
        alert("Student Added Successfully");

        setName("");
        setCollege("");
        setSkill("");

        getStudents();
      } else {
        alert("Failed to Add Student");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Update Student
  const updateStudent = async (student) => {
    const newName = prompt("Enter Name", student.name);
    if (newName === null) return;

    const newCollege = prompt("Enter College", student.college);
    if (newCollege === null) return;

    const newSkill = prompt("Enter Skill", student.skill);
    if (newSkill === null) return;

    try {
      const response = await fetch(`${API}/students/${student.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          college: newCollege,
          skill: newSkill,
        }),
      });

      console.log("Status:", response.status);

      const message = await response.text();
      console.log("Response:", message);

      if (response.ok) {
        alert("Student Updated Successfully");
        getStudents();
      } else {
        alert(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Student
  const deleteStudent = async (id) => {
    try {
      const response = await fetch(`${API}/students/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Student Deleted Successfully");
        getStudents();
      } else {
        alert("Delete Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Student Management System</h1>

      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="College Name"
        value={college}
        onChange={(e) => setCollege(e.target.value)}
      />

      <input
        type="text"
        placeholder="Skill"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
      />

      <button onClick={addStudent}>Add Student</button>

      <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>College</th>
            <th>Skill</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.college}</td>
              <td>{student.skill}</td>

              <td>
                <button onClick={() => updateStudent(student)}>
                  Edit
                </button>

                <button onClick={() => deleteStudent(student.id)}>
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

export default App;