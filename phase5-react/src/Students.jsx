import { useState, useEffect } from 'react';
import StudentCard from './StudentCard';
import { fetchStudents, createStudentApi, updateStudentApi, deleteStudentApi, resetAllData } from './api';

const DEPARTMENTS = [
  'All Departments',
  'Data Science',
  'Computer Science',
  'Artificial Intelligence',
  'Information Technology',
  'Cyber Security'
];

function Students({ isConnected }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Data Science',
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
      showToast('Error loading students', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [isConnected]);

  // Open modal for Create
  const handleOpenCreateModal = () => {
    setEditingStudent(null);
    setFormData({
      name: '',
      email: '',
      department: 'Data Science',
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
      department: student.department || 'Data Science',
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
      setFormError('Student name is required.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@') || !formData.email.includes('.')) {
      setFormError('Please enter a valid email address containing @ and .');
      return;
    }

    try {
      if (editingStudent) {
        // Update
        const payload = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          department: formData.department,
          password: formData.password || editingStudent.password || 'password123'
        };
        await updateStudentApi(editingStudent.id, payload, isConnected);
        showToast(`Student "${formData.name}" updated successfully!`);
      } else {
        // Create
        const payload = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          department: formData.department,
          password: formData.password || 'password123'
        };
        await createStudentApi(payload, isConnected);
        showToast(`Student "${formData.name}" added successfully!`);
      }
      handleCloseModal();
      await loadData();
    } catch (err) {
      console.error(err);
      setFormError('Failed to save student record.');
    }
  };

  // Confirm delete
  const handleDeleteConfirm = async () => {
    if (!deleteCandidate) return;
    try {
      await deleteStudentApi(deleteCandidate.id, isConnected);
      showToast(`Student "${deleteCandidate.name}" removed successfully.`, 'info');
      setDeleteCandidate(null);
      await loadData();
    } catch (err) {
      console.error(err);
      showToast('Failed to delete student.', 'error');
    }
  };

  // Reset demo data
  const handleResetData = () => {
    if (window.confirm('Reset student records to initial sample data?')) {
      resetAllData();
      loadData();
      showToast('Sample student data restored.');
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (students.length === 0) return;
    const headers = 'ID,Name,Department,Email\n';
    const rows = students
      .map(s => `${s.id},"${s.name}","${s.department}","${s.email}"`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `students_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Student records exported as CSV.');
  };

  // Filter students
  const filteredStudents = students.filter(student => {
    const matchesSearch =
      (student.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.department || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept =
      selectedDept === 'All Departments' ||
      (student.department || '').toLowerCase() === selectedDept.toLowerCase();

    return matchesSearch && matchesDept;
  });

  return (
    <div className="page-container">
      {/* Toast */}
      {toast && (
        <div className={`toast-notification ${toast.type}`}>
          <div className="toast-icon">
            {toast.type === 'error' ? '❌' : toast.type === 'info' ? 'ℹ️' : '✅'}
          </div>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header bar */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Student Directory</h1>
          <p className="page-subtitle">
            Manage student registrations, academic departments, and profile information with full CRUD operations.
          </p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={handleExportCSV} title="Download CSV">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export CSV
          </button>
          <button className="btn btn-primary" onClick={handleOpenCreateModal}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Student
          </button>
        </div>
      </div>

      {/* Filter & Controls Panel */}
      <div className="controls-panel">
        <div className="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="search-icon">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search by name, email, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button className="clear-btn" onClick={() => setSearchQuery('')} aria-label="Clear search">
              &times;
            </button>
          )}
        </div>

        <div className="filter-controls">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="select-dropdown"
          >
            {DEPARTMENTS.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Card Grid View"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
            </button>
            <button
              className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="Data Table View"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <line x1="8" y1="6" x2="21" y2="6"/>
                <line x1="8" y1="12" x2="21" y2="12"/>
                <line x1="8" y1="18" x2="21" y2="18"/>
                <line x1="3" y1="6" x2="3.01" y2="6"/>
                <line x1="3" y1="12" x2="3.01" y2="12"/>
                <line x1="3" y1="18" x2="3.01" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Meta Counter Bar */}
      <div className="meta-bar">
        <span className="results-count">
          Showing <strong>{filteredStudents.length}</strong> of <strong>{students.length}</strong> registered students
        </span>
        <button className="text-btn" onClick={handleResetData} title="Restore initial students">
          Reset Sample Data
        </button>
      </div>

      {/* Content Rendering */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading student records...</p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No students match your criteria</h3>
          <p>Try searching for a different keyword or department filter, or add a new student.</p>
          <button className="btn btn-primary" onClick={handleOpenCreateModal}>
            Add First Student
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="students-grid">
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
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Student Name</th>
                <th>Department</th>
                <th>Email Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td><span className="badge-id">#{String(student.id).padStart(3, '0')}</span></td>
                  <td className="table-name">{student.name}</td>
                  <td>
                    <span className="dept-pill">{student.department}</span>
                  </td>
                  <td>
                    <a href={`mailto:${student.email}`} className="table-link">{student.email}</a>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="btn-sm btn-edit" onClick={() => handleOpenEditModal(student)}>Edit</button>
                      <button className="btn-sm btn-delete" onClick={() => setDeleteCandidate(student)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
              <button className="modal-close" onClick={handleCloseModal}>&times;</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {formError && <div className="form-error-banner">{formError}</div>}

                <div className="form-group">
                  <label htmlFor="student-name">Full Name *</label>
                  <input
                    id="student-name"
                    type="text"
                    placeholder="e.g. Alice Walker"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="student-email">Email Address *</label>
                  <input
                    id="student-email"
                    type="email"
                    placeholder="e.g. alice@college.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="student-department">Academic Department *</label>
                  <select
                    id="student-department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  >
                    <option value="Data Science">Data Science</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Cyber Security">Cyber Security</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="student-password">Password {editingStudent ? '(Leave blank to keep current)' : '(Optional)'}</label>
                  <input
                    id="student-password"
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
                <button type="submit" className="btn btn-primary">
                  {editingStudent ? 'Save Changes' : 'Create Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <div className="modal-backdrop" onClick={() => setDeleteCandidate(null)}>
          <div className="modal-card modal-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon">⚠️</div>
            <h2>Confirm Removal</h2>
            <p>
              Are you sure you want to delete student <strong>"{deleteCandidate.name}"</strong> (ID: #{deleteCandidate.id})? This action cannot be undone.
            </p>
            <div className="modal-footer justify-center">
              <button className="btn btn-secondary" onClick={() => setDeleteCandidate(null)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleDeleteConfirm}>
                Yes, Delete Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;