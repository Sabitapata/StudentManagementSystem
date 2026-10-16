import { useState, useEffect } from 'react';
import StudentCard from './StudentCard';
import { fetchStudents, createStudentApi, updateStudentApi, deleteStudentApi, resetAllData } from './api';

const SCHOOL_CLASSES = [
  'All Classes',
  'Class 10-A (Science)',
  'Class 10-B (General)',
  'Class 11-A (Mathematics)',
  'Class 12-A (Physics & AI)',
  'Class 12-B (Computer Sci)',
  'Class 9-A (Foundation)'
];

const HOUSES = ['Sapphire House', 'Ruby House', 'Emerald House', 'Topaz House'];

function Students({ isConnected }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Class 10-A (Science)',
    rollNo: '',
    house: 'Sapphire House',
    password: ''
  });
  const [formError, setFormError] = useState('');

  // Toast notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchStudents(isConnected);
      setStudents(data);
    } catch (err) {
      console.error(err);
      showToast('Error loading student roster', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [isConnected]);

  // Open modal for Admission
  const handleOpenCreateModal = () => {
    setEditingStudent(null);
    setFormData({
      name: '',
      email: '',
      department: 'Class 10-A (Science)',
      rollNo: `GW-${Math.floor(1000 + Math.random() * 9000)}`,
      house: 'Sapphire House',
      password: ''
    });
    setFormError('');
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEditModal = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name || '',
      email: student.email || '',
      department: student.department || 'Class 10-A (Science)',
      rollNo: student.rollNo || `GW-${String(student.id).padStart(4, '0')}`,
      house: student.house || 'Sapphire House',
      password: student.password || ''
    });
    setFormError('');
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
    setFormError('');
  };

  // Save (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError('Student full name is required.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@') || !formData.email.includes('.')) {
      setFormError('Please enter a valid school email address (must include @ and .).');
      return;
    }

    try {
      if (editingStudent) {
        // Update
        const payload = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          department: formData.department,
          rollNo: formData.rollNo,
          house: formData.house,
          password: formData.password || editingStudent.password || 'password123'
        };
        await updateStudentApi(editingStudent.id, payload, isConnected);
        showToast(`Scholar "${formData.name}" records updated successfully!`);
      } else {
        // Create
        const payload = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          department: formData.department,
          rollNo: formData.rollNo || `GW-${Math.floor(1000 + Math.random() * 9000)}`,
          house: formData.house || 'Sapphire House',
          password: formData.password || 'password123'
        };
        await createStudentApi(payload, isConnected);
        showToast(`Student "${formData.name}" enrolled successfully!`);
      }
      handleCloseModal();
      await loadData();
    } catch (err) {
      console.error(err);
      setFormError('Failed to save student admission record.');
    }
  };

  // Confirm delete
  const handleDeleteConfirm = async () => {
    if (!deleteCandidate) return;
    try {
      await deleteStudentApi(deleteCandidate.id, isConnected);
      showToast(`Student "${deleteCandidate.name}" removed from school records.`, 'info');
      setDeleteCandidate(null);
      await loadData();
    } catch (err) {
      console.error(err);
      showToast('Failed to delete student.', 'error');
    }
  };

  // Reset demo data
  const handleResetData = () => {
    if (window.confirm('Restore initial school student roster?')) {
      resetAllData();
      loadData();
      showToast('School student sample roster restored.');
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (students.length === 0) return;
    const headers = 'Roll No,ID,Full Name,Class & Section,School Email,House\n';
    const rows = students
      .map(s => `"${s.rollNo || 'GW-' + s.id}",${s.id},"${s.name}","${s.department}","${s.email}","${s.house || 'General'}"`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Greenwood_Students_Roster_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Student roster exported as CSV.');
  };

  // Filter students
  const filteredStudents = students.filter(student => {
    const matchesSearch =
      (student.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.department || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.rollNo || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClass =
      selectedClass === 'All Classes' ||
      (student.department || '').toLowerCase() === selectedClass.toLowerCase();

    return matchesSearch && matchesClass;
  });

  return (
    <div className="page-container">
      {/* Toast */}
      {toast && (
        <div className={`toast-notification ${toast.type}`}>
          <div className="toast-icon">
            {toast.type === 'error' ? '❌' : toast.type === 'info' ? 'ℹ️' : '🎓'}
          </div>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header bar */}
      <div className="school-section-header">
        <div className="header-title-box">
          <div className="header-crest-icon">🎒</div>
          <div>
            <h1 className="school-page-title">Student Admissions &amp; Roster</h1>
            <p className="school-page-subtitle">
              Manage student registrations, academic classes, assigned houses, and contact profiles.
            </p>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn btn-school-outline" onClick={handleExportCSV} title="Download Student List CSV">
            📥 Export Roster CSV
          </button>
          <button className="btn btn-school-primary" onClick={handleOpenCreateModal}>
            <span>➕</span> New Admission
          </button>
        </div>
      </div>

      {/* Filter & Controls Panel */}
      <div className="school-controls-panel">
        <div className="search-box">
          <span className="school-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search scholar by name, roll no, class, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="school-search-input"
          />
          {searchQuery && (
            <button className="clear-btn" onClick={() => setSearchQuery('')} aria-label="Clear search">
              &times;
            </button>
          )}
        </div>

        <div className="school-filter-group">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="school-select"
          >
            {SCHOOL_CLASSES.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>

          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Student ID Cards View"
            >
              🆔 Cards
            </button>
            <button
              className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="Class Register Table View"
            >
              📋 Register
            </button>
          </div>
        </div>
      </div>

      {/* Meta Counter Bar */}
      <div className="school-meta-bar">
        <span className="results-count">
          Enrolled: <strong>{filteredStudents.length}</strong> of <strong>{students.length}</strong> registered students
        </span>
        <button className="text-btn" onClick={handleResetData} title="Restore standard sample roster">
          Reset School Roster
        </button>
      </div>

      {/* Content Rendering */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Accessing school registry database...</p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🎒</div>
          <h3>No students found for this class or search criteria</h3>
          <p>Try searching with another keyword or admit a new student into the school roster.</p>
          <button className="btn btn-school-primary" onClick={handleOpenCreateModal}>
            Admit New Student
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="students-id-grid">
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onEdit={handleOpenEditModal}
              onDelete={(s) => setDeleteCandidate(s)}
            />
          ))}
        </div>
      ) : (
        <div className="school-table-container">
          <table className="school-data-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Class &amp; Section</th>
                <th>School House</th>
                <th>Contact Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td><span className="roll-badge">{student.rollNo || `GW-${String(student.id).padStart(4, '0')}`}</span></td>
                  <td className="table-student-name">
                    <strong>{student.name}</strong>
                  </td>
                  <td>
                    <span className="class-chip">{student.department}</span>
                  </td>
                  <td>
                    <span className="house-tag">{student.house || 'Sapphire'}</span>
                  </td>
                  <td>
                    <a href={`mailto:${student.email}`} className="school-table-link">{student.email}</a>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="btn-sm btn-edit" onClick={() => handleOpenEditModal(student)}>Edit</button>
                      <button className="btn-sm btn-delete" onClick={() => setDeleteCandidate(student)}>Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Admission / Edit Modal */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="school-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="school-modal-header">
              <div className="modal-crest">🎓</div>
              <div>
                <h2>{editingStudent ? 'Edit Student Details' : 'Student Admission Form'}</h2>
                <p>Greenwood Academy &bull; Academic Year 2026-27</p>
              </div>
              <button className="modal-close" onClick={handleCloseModal}>&times;</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {formError && <div className="form-error-banner">{formError}</div>}

                <div className="form-group">
                  <label htmlFor="student-name">Scholar Full Name *</label>
                  <input
                    id="student-name"
                    type="text"
                    placeholder="e.g. Aarav Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    autoFocus
                  />
                </div>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label htmlFor="student-roll">Roll / Admission Number</label>
                    <input
                      id="student-roll"
                      type="text"
                      placeholder="e.g. GW-1045"
                      value={formData.rollNo}
                      onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    />
                  </div>

                  <div className="form-group flex-1">
                    <label htmlFor="student-house">School House</label>
                    <select
                      id="student-house"
                      value={formData.house}
                      onChange={(e) => setFormData({ ...formData, house: e.target.value })}
                    >
                      {HOUSES.map(h => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="student-email">Student / Parent Email Address *</label>
                  <input
                    id="student-email"
                    type="email"
                    placeholder="e.g. aarav.s@greenwood.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="student-class">Assigned Class / Grade *</label>
                  <select
                    id="student-class"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  >
                    <option value="Class 10-A (Science)">Class 10-A (Science)</option>
                    <option value="Class 10-B (General)">Class 10-B (General)</option>
                    <option value="Class 11-A (Mathematics)">Class 11-A (Mathematics)</option>
                    <option value="Class 12-A (Physics & AI)">Class 12-A (Physics & AI)</option>
                    <option value="Class 12-B (Computer Sci)">Class 12-B (Computer Sci)</option>
                    <option value="Class 9-A (Foundation)">Class 9-A (Foundation)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="student-pass">Portal Password {editingStudent ? '(Leave blank to retain current)' : '(Default: password123)'}</label>
                  <input
                    id="student-pass"
                    type="password"
                    placeholder="Set student login password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-school-primary">
                  {editingStudent ? 'Save Records' : 'Confirm Admission'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <div className="modal-backdrop" onClick={() => setDeleteCandidate(null)}>
          <div className="school-modal-card modal-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon">⚠️</div>
            <h2>Confirm Student De-registration</h2>
            <p>
              Are you sure you want to withdraw <strong>"{deleteCandidate.name}"</strong> (Roll No: {deleteCandidate.rollNo || deleteCandidate.id}) from the official school roll?
            </p>
            <div className="modal-footer justify-center">
              <button className="btn btn-secondary" onClick={() => setDeleteCandidate(null)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleDeleteConfirm}>
                Withdraw Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;