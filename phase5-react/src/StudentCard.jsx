function StudentCard({ name, department, email }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', margin: '10px 0' }}>
      <h3>{name}</h3>
      <p>Department: {department}</p>
      <p>Email: {email}</p>
    </div>
  );
}

export default StudentCard;