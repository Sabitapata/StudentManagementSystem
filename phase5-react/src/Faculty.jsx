import { useState, useEffect } from 'react';
import { fetchFaculty, createFacultyApi } from './api';

function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFaculty, setNewFaculty] = useState({
    name: '',
    email: '',
    department: 'Mathematics Wing',
    role: 'Senior Subject Teacher',
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
      department: 'Mathematics Wing',
      role: 'Senior Subject Teacher',
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
      <div className="school-section-header">
        <div className="header-title-box">
          <div className="header-crest-icon">👨‍🏫</div>
          <div>
            <h1 className="school-page-title">Teaching Faculty &amp; Staff</h1>
            <p className="school-page-subtitle">
              Distinguished educators, department heads, and academic mentors of Greenwood Academy.
            </p>
          </div>
        </div>
        <button className="btn btn-school-primary" onClick={() => setIsModalOpen(true)}>
          <span>➕</span> Add Faculty Member
        </button>
      </div>

      <div className="school-controls-panel">
        <div className="search-box">
          <span className="school-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search faculty by name, department, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="school-search-input"
          />
        </div>
      </div>

      <div className="school-meta-bar">
        <span className="results-count">
          Showing <strong>{filteredFaculty.length}</strong> academic faculty educators
        </span>
      </div>

      <div className="faculty-grid">
        {filteredFaculty.map((f) => (
          <div key={f.id} className="school-faculty-card">
            <div className="faculty-card-header">
              <div className="faculty-avatar-circle">
                👨‍🏫
              </div>
              <div className="faculty-title-group">
                <h3 className="faculty-name">{f.name}</h3>
                <span className="faculty-role-pill">{f.role || 'Senior Teacher'}</span>
              </div>
            </div>

            <div className="faculty-body-details">
              <div className="faculty-row">
                <span className="f-label">Department / Wing:</span>
                <span className="f-wing-tag">{f.department}</span>
              </div>

              <div className="faculty-row">
                <span className="f-label">Official Email:</span>
                <a href={`mailto:${f.email}`} className="f-email">
                  📧 {f.email}
                </a>
              </div>

              <div className="faculty-row subjects-row">
                <span className="f-label">Assigned Classes &amp; Subjects:</span>
                <div className="faculty-chips-wrap">
                  {(f.courses || []).map((course, idx) => (
                    <span key={idx} className="subject-chip">📖 {course}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="school-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="school-modal-header">
              <div className="modal-crest">👨‍🏫</div>
              <div>
                <h2>Add Faculty Member</h2>
                <p>Staff Onboarding &bull; Greenwood Academy</p>
              </div>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>

            <form onSubmit={handleAddFaculty}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="faculty-name">Educator Full Name *</label>
                  <input
                    id="faculty-name"
                    type="text"
                    placeholder="e.g. Dr. R. Sharma"
                    value={newFaculty.name}
                    onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="faculty-email">School Email Address *</label>
                  <input
                    id="faculty-email"
                    type="email"
                    placeholder="e.g. r.sharma@greenwood.edu"
                    value={newFaculty.email}
                    onChange={(e) => setNewFaculty({ ...newFaculty, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label htmlFor="faculty-dept">Academic Wing *</label>
                    <select
                      id="faculty-dept"
                      value={newFaculty.department}
                      onChange={(e) => setNewFaculty({ ...newFaculty, department: e.target.value })}
                    >
                      <option value="Mathematics Wing">Mathematics Wing</option>
                      <option value="Science Wing">Science Wing</option>
                      <option value="Languages Wing">Languages Wing</option>
                      <option value="Computer Wing">Computer Wing</option>
                      <option value="Social Studies Wing">Social Studies Wing</option>
                    </select>
                  </div>

                  <div className="form-group flex-1">
                    <label htmlFor="faculty-role">Designation / Role</label>
                    <input
                      id="faculty-role"
                      type="text"
                      placeholder="e.g. Head of Department"
                      value={newFaculty.role}
                      onChange={(e) => setNewFaculty({ ...newFaculty, role: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="faculty-courses">Subjects Taught (comma separated)</label>
                  <input
                    id="faculty-courses"
                    type="text"
                    placeholder="e.g. Algebra, Trigonometry, Calculus"
                    value={newFaculty.courses}
                    onChange={(e) => setNewFaculty({ ...newFaculty, courses: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-school-primary">
                  Save Faculty Record
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
