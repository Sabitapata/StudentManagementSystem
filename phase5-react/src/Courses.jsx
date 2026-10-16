import { useState, useEffect } from 'react';
import { fetchCourses, createCourseApi, deleteCourseApi } from './api';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: '',
    code: '',
    credits: 4,
    facultyName: 'Dr. Sharma',
    department: 'Computer Science'
  });

  useEffect(() => {
    setCourses(fetchCourses());
  }, []);

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.name.trim() || !newCourse.code.trim()) return;
    const added = createCourseApi(newCourse);
    setCourses([added, ...courses]);
    setNewCourse({
      name: '',
      code: '',
      credits: 4,
      facultyName: 'Dr. Sharma',
      department: 'Computer Science'
    });
    setIsModalOpen(false);
  };

  const handleDeleteCourse = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteCourseApi(id);
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const filteredCourses = courses.filter(c =>
    (c.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.code || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.department || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.facultyName || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Academic Courses</h1>
          <p className="page-subtitle">
            Explore curriculum offerings, course credit weightages, and assigned faculty instructors.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Course
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
            placeholder="Search by course name, code, or faculty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="meta-bar">
        <span className="results-count">
          Showing <strong>{filteredCourses.length}</strong> available courses
        </span>
      </div>

      <div className="courses-grid">
        {filteredCourses.map((c) => (
          <div key={c.id} className="course-card">
            <div className="course-header">
              <span className="course-code">{c.code || `CRS-${c.id}`}</span>
              <span className="credits-badge">{c.credits} Credits</span>
            </div>

            <h3 className="course-title">{c.name}</h3>

            <div className="course-meta">
              <div className="meta-item">
                <span className="meta-label">Department</span>
                <span className="meta-value dept-tag dept-cs">{c.department}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Lead Instructor</span>
                <span className="meta-value instructor-name">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  {c.facultyName}
                </span>
              </div>
            </div>

            <div className="card-actions justify-end">
              <button
                className="btn-action delete"
                onClick={() => handleDeleteCourse(c.id)}
                title="Delete Course"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Course</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>

            <form onSubmit={handleAddCourse}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="course-code">Course Code *</label>
                  <input
                    id="course-code"
                    type="text"
                    placeholder="e.g. CS-405"
                    value={newCourse.code}
                    onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="course-name">Course Title *</label>
                  <input
                    id="course-name"
                    type="text"
                    placeholder="e.g. Cloud Computing & Microservices"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label htmlFor="course-credits">Credits *</label>
                    <input
                      id="course-credits"
                      type="number"
                      min="1"
                      max="6"
                      value={newCourse.credits}
                      onChange={(e) => setNewCourse({ ...newCourse, credits: Number(e.target.value) })}
                      required
                    />
                  </div>

                  <div className="form-group flex-1">
                    <label htmlFor="course-dept">Department *</label>
                    <select
                      id="course-dept"
                      value={newCourse.department}
                      onChange={(e) => setNewCourse({ ...newCourse, department: e.target.value })}
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Artificial Intelligence">Artificial Intelligence</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Cyber Security">Cyber Security</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="course-faculty">Faculty Instructor *</label>
                  <input
                    id="course-faculty"
                    type="text"
                    placeholder="e.g. Dr. Sharma"
                    value={newCourse.facultyName}
                    onChange={(e) => setNewCourse({ ...newCourse, facultyName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;
