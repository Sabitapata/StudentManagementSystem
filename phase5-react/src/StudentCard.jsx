function StudentCard({ student, onEdit, onDelete }) {
  const { id, name, department, email } = student;

  // Generate consistent color based on name
  const colors = [
    'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
    'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
    'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
  ];
  const charCode = (name || 'A').charCodeAt(0);
  const avatarBg = colors[charCode % colors.length];

  const initials = (name || 'S')
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const getDeptClass = (dept) => {
    const d = (dept || '').toLowerCase();
    if (d.includes('data')) return 'dept-tag dept-ds';
    if (d.includes('comp') || d.includes('cs')) return 'dept-tag dept-cs';
    if (d.includes('artif') || d.includes('ai')) return 'dept-tag dept-ai';
    if (d.includes('sec')) return 'dept-tag dept-sec';
    return 'dept-tag dept-default';
  };

  return (
    <div className="student-card">
      <div className="card-header">
        <div className="card-avatar" style={{ background: avatarBg }}>
          {initials}
        </div>
        <div className="card-identity">
          <h3 className="card-name" title={name}>{name}</h3>
          <span className="card-id">ID: #{String(id).padStart(3, '0')}</span>
        </div>
      </div>

      <div className="card-body">
        <div className="card-field">
          <span className="field-label">Department</span>
          <span className={getDeptClass(department)}>{department || 'General'}</span>
        </div>

        <div className="card-field">
          <span className="field-label">Email Address</span>
          <a href={`mailto:${email}`} className="card-email" title={email}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span>{email}</span>
          </a>
        </div>
      </div>

      <div className="card-actions">
        <button
          className="btn-action edit"
          onClick={() => onEdit(student)}
          title="Edit student information"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          Edit
        </button>

        <button
          className="btn-action delete"
          onClick={() => onDelete(student)}
          title="Delete student"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
}

export default StudentCard;