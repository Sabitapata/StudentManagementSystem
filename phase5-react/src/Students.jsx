import { useState } from 'react';
import StudentCard from './StudentCard';

function Students() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice', department: 'Data Science', email: 'alice@college.edu' },
    { id: 2, name: 'Bob', department: 'Computer Science', email: 'bob@college.edu' },
  ]);

  const [newName, setNewName] = useState('');
  const [newDept, setNewDept] = useState('');
  const [newEmail, setNewEmail] = useState('');

  function addStudent() {
    if (!newName.trim() || !newEmail.trim()) return;

    const newStudent = {
      id: students.length + 1,
      name: newName,
      department: newDept,
      email: newEmail,
    };

    setStudents([...students, newStudent]);
    setNewName('');
    setNewDept('');
    setNewEmail('');
  }

  return (
    <div>
      <h2>Student List</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{ marginRight: '5px' }}
        />
        <input
          type="text"
          placeholder="Department"
          value={newDept}
          onChange={(e) => setNewDept(e.target.value)}
          style={{ marginRight: '5px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          style={{ marginRight: '5px' }}
        />
        <button onClick={addStudent}>Add Student</button>
      </div>

      {students.map((student) => (
        <StudentCard
          key={student.id}
          name={student.name}
          department={student.department}
          email={student.email}
        />
      ))}
    </div>
  );
}

export default Students;