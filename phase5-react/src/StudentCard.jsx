function StudentCard({ student, onEdit, onDelete }) {
  const { id, name, department, email, rollNo, house } = student;

  // Determine school house based on student or fallback
  const houses = ['Sapphire House', 'Ruby House', 'Emerald House', 'Topaz House'];
  const assignedHouse = house || houses[(id || 1) % houses.length];

  const getHouseStyle = (h) => {
    if (h.includes('Ruby')) return { color: '#991b1b', bg: '#fee2e2', border: '#fca5a5', icon: '🦁' };
    if (h.includes('Emerald')) return { color: '#166534', bg: '#dcfce7', border: '#86efac', icon: '🌲' };
    if (h.includes('Topaz')) return { color: '#92400e', bg: '#fef3c7', border: '#fde68a', icon: '☀️' };
    return { color: '#1e40af', bg: '#dbeafe', border: '#93c5fd', icon: '🦅' };
  };

  const houseStyle = getHouseStyle(assignedHouse);

  const initials = (name || 'S')
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="school-id-card">
      {/* Top Lanyard / Header Bar */}
      <div className="id-card-top-bar">
        <div className="id-school-logo">
          <span>🎓</span>
          <strong>GREENWOOD ACADEMY</strong>
        </div>
        <span className="id-card-type">STUDENT PASS</span>
      </div>

      <div className="id-card-content">
        <div className="id-card-main">
          {/* Avatar / Photo Slot */}
          <div className="id-avatar-frame">
            <div className="id-avatar-initials">
              {initials}
            </div>
            <div className="id-academic-cap">🎖️</div>
          </div>

          <div className="id-identity">
            <h3 className="id-student-name" title={name}>{name}</h3>
            <div className="id-roll-number">
              <span className="id-label">ROLL NO:</span>
              <strong>{rollNo || `GW-${String(id).padStart(4, '0')}`}</strong>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="id-details-box">
          <div className="id-detail-row">
            <span className="id-field-name">Class / Grade:</span>
            <span className="id-class-tag">{department || 'Class 10-A'}</span>
          </div>

          <div className="id-detail-row">
            <span className="id-field-name">School House:</span>
            <span
              className="id-house-pill"
              style={{
                color: houseStyle.color,
                background: houseStyle.bg,
                borderColor: houseStyle.border
              }}
            >
              <span>{houseStyle.icon}</span> {assignedHouse}
            </span>
          </div>

          <div className="id-detail-row">
            <span className="id-field-name">Contact Email:</span>
            <a href={`mailto:${email}`} className="id-email-link" title={email}>
              📧 {email}
            </a>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="id-card-actions">
        <button
          className="btn-id-action edit"
          onClick={() => onEdit(student)}
          title="Edit student record"
        >
          ✏️ Edit Details
        </button>

        <button
          className="btn-id-action delete"
          onClick={() => onDelete(student)}
          title="Remove student record"
        >
          🗑️ Remove
        </button>
      </div>
    </div>
  );
}

export default StudentCard;