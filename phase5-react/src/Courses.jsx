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
    facultyName: 'Dr. R. Sharma (HOD)',
    department: 'Science Wing'
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
      facultyName: 'Dr. R. Sharma (HOD)',
      department: 'Science Wing'
    });
    setIsModalOpen(false);
  };

  const handleDeleteCourse = (id) => {
    if (window.confirm('Remove this subject from school syllabus?')) {
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
      <div className="school-section-header">
        <div className="header-title-box">
          <div className="header-crest-icon">📚</div>
          <div>
            <h1 className="school-page-title">Academic Curriculum &amp; Subjects</h1>
            <p className="school-page-subtitle">
              Official school syllabus: course modules, weekly teaching periods, and designated subject masters.
            </p>
          </div>
        </div>
        <button className="btn btn-school-primary" onClick={() => setIsModalOpen(true)}>
          <span>➕</span> Add Subject
        </button>
      </div>

      <div className="school-controls-panel">
        <div className="search-box">
          <span className="school-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search subject by title, code, wing, or teacher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="school-search-input"
          />
        </div>
      </div>

      <div className="school-meta-bar">
        <span className="results-count">
          Showing <strong>{filteredCourses.length}</strong> active academic subjects
        </span>
      </div>

      <div className="courses-grid">
        {filteredCourses.map((c) => (
          <div key={c.id} className="school-subject-card">
            <div className="subject-card-top">
              <span className="subject-code">{c.code || `SUB-${c.id}`}</span>
              <span className="periods-badge">⏱️ {c.credits} Periods/Week</span>
            </div>

            <h3 className="subject-title">{c.name}</h3>

            <div className="subject-meta-box">
              <div className="subject-meta-line">
                <span className="meta-label">Academic Wing:</span>
                <span className="meta-wing">{c.department}</span>
              </div>
              <div className="subject-meta-line">
                <span className="meta-label">Subject Master:</span>
                <span className="meta-teacher">
                  👨‍🏫 {c.facultyName}
                </span>
              </div>
            </div>

            <div className="card-actions justify-end">
              <button
                className="btn-id-action delete"
                onClick={() => handleDeleteCourse(c.id)}
                title="Remove subject"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="school-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="school-modal-header">
              <div className="modal-crest">📚</div>
              <div>
                <h2>Add New School Subject</h2>
                <p>Curriculum Planning &bull; Session 2026-27</p>
              </div>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>

            <form onSubmit={handleAddCourse}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="course-code">Subject Code *</label>
                  <input
                    id="course-code"
                    type="text"
                    placeholder="e.g. MATH-10"
                    value={newCourse.code}
                    onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="course-name">Subject Title *</label>
                  <input
                    id="course-name"
                    type="text"
                    placeholder="e.g. Physics & Experimental Chemistry"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label htmlFor="course-credits">Periods per Week *</label>
                    <input
                      id="course-credits"
                      type="number"
                      min="1"
                      max="8"
                      value={newCourse.credits}
                      onChange={(e) => setNewCourse({ ...newCourse, credits: Number(e.target.value) })}
                      required
                    />
                  </div>

                  <div className="form-group flex-1">
                    <label htmlFor="course-dept">Academic Wing *</label>
                    <select
                      id="course-dept"
                      value={newCourse.department}
                      onChange={(e) => setNewCourse({ ...newCourse, department: e.target.value })}
                    >
                      <option value="Science Wing">Science Wing</option>
                      <option value="Mathematics Wing">Mathematics Wing</option>
                      <option value="Language Wing">Language Wing</option>
                      <option value="Computer Wing">Computer Wing</option>
                      <option value="Humanities & Arts">Humanities &amp; Arts</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="course-faculty">Assigned Teacher *</label>
                  <input
                    id="course-faculty"
                    type="text"
                    placeholder="e.g. Dr. R. Sharma"
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
                <button type="submit" className="btn btn-school-primary">
                  Save Subject
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
