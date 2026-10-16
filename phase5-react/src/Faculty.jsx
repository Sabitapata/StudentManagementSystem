import { useState, useEffect } from 'react';
import { fetchFaculty, createFacultyApi } from './api';

function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFaculty, setNewFaculty] = useState({
    name: '',
    email: '',
    department: 'Computer Science',
    role: 'Assistant Professor',
    courses: ''
  });

  useEffect(() => {
    setFaculty(fetchFaculty());
  }, []);

  const handleAddFaculty = (e) => {
    e.preventDefault();
    if (!newFaculty.name.trim() || !newFaculty.email.trim()) return;

    const courseList = newFaculty.courses
      ? newFaculty.courses.split(',').map(c => c.trim()).filter(Boolean)
      : ['General'];

    const added = createFacultyApi({
      ...newFaculty,
      courses: courseList
    });

    setFaculty([added, ...faculty]);
    setNewFaculty({
      name: '',
      email: '',
      department: 'Computer Science',
      role: 'Assistant Professor',
      courses: ''
    });
    setIsModalOpen(false);
  };

  const filteredFaculty = faculty.filter(f =>
    (f.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (f.department || '').toLowerCase().includes(search.toLowerCase()) ||
    (f.email || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Faculty Directory</h1>
          <p className="page-subtitle">
            Meet the academic mentors, professors, and instructors guiding your specialization.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Faculty
        </button>
      </div>

      <div className="controls-panel">
        <div className="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="search-icon">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search faculty by name, department, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="meta-bar">
        <span className="results-count">
          Showing <strong>{filteredFaculty.length}</strong> academic faculty members
        </span>
      </div>

      <div className="faculty-grid">
        {filteredFaculty.map((f) => (
          <div key={f.id} className="faculty-card">
            <div className="faculty-badge-icon">
              👨‍🏫
            </div>
            <h3 className="faculty-name">{f.name}</h3>
            <span className="faculty-role">{f.role || 'Faculty Member'}</span>

            <div className="faculty-detail">
              <span className="detail-label">Department</span>
              <span className="dept-tag dept-ds">{f.department}</span>
            </div>

            <div className="faculty-detail">
              <span className="detail-label">Contact</span>
              <a href={`mailto:${f.email}`} className="card-email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                {f.email}
              </a>
            </div>

            <div className="faculty-courses">
              <span className="detail-label">Courses Assigned:</span>
              <div className="course-chips">
                {(f.courses || []).map((course, idx) => (
                  <span key={idx} className="chip">{course}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Faculty Member</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>

            <form onSubmit={handleAddFaculty}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="faculty-name">Full Name *</label>
                  <input
                    id="faculty-name"
                    type="text"
                    placeholder="e.g. Dr. Rajesh Rao"
                    value={newFaculty.name}
                    onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="faculty-email">Email Address *</label>
                  <input
                    id="faculty-email"
                    type="email"
                    placeholder="e.g. rajesh@college.edu"
                    value={newFaculty.email}
                    onChange={(e) => setNewFaculty({ ...newFaculty, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label htmlFor="faculty-dept">Department *</label>
                    <select
                      id="faculty-dept"
                      value={newFaculty.department}
                      onChange={(e) => setNewFaculty({ ...newFaculty, department: e.target.value })}
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Artificial Intelligence">Artificial Intelligence</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Cyber Security">Cyber Security</option>
                    </select>
                  </div>

                  <div className="form-group flex-1">
                    <label htmlFor="faculty-role">Designation / Role</label>
                    <input
                      id="faculty-role"
                      type="text"
                      placeholder="e.g. Professor"
                      value={newFaculty.role}
                      onChange={(e) => setNewFaculty({ ...newFaculty, role: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="faculty-courses">Courses Taught (comma separated)</label>
                  <input
                    id="faculty-courses"
                    type="text"
                    placeholder="e.g. Machine Learning, Deep Learning"
                    value={newFaculty.courses}
                    onChange={(e) => setNewFaculty({ ...newFaculty, courses: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Faculty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Faculty;
