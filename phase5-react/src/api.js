// API helper to communicate with the Spring Boot REST API
// If the backend is not running, it automatically falls back to localStorage

export const API_BASE_URL = 'http://localhost:8081/api/students';

// School-themed initial data
const INITIAL_STUDENTS = [
  { id: 1, name: 'Aarav Sharma', department: 'Class 10-A (Science)', email: 'aarav.s@greenwood.edu', password: 'password123', rollNo: 'SCH-1001', house: 'Sapphire' },
  { id: 2, name: 'Ananya Patel', department: 'Class 12-B (Computer Sci)', email: 'ananya.p@greenwood.edu', password: 'password123', rollNo: 'SCH-1204', house: 'Ruby' },
  { id: 3, name: 'Rohan Deshmukh', department: 'Class 11-A (Mathematics)', email: 'rohan.d@greenwood.edu', password: 'password123', rollNo: 'SCH-1108', house: 'Emerald' },
  { id: 4, name: 'Diya Sengupta', department: 'Class 10-B (General)', email: 'diya.s@greenwood.edu', password: 'password123', rollNo: 'SCH-1015', house: 'Topaz' },
  { id: 5, name: 'Kabir Verma', department: 'Class 12-A (Physics & AI)', email: 'kabir.v@greenwood.edu', password: 'password123', rollNo: 'SCH-1219', house: 'Sapphire' },
  { id: 6, name: 'Meera Iyer', department: 'Class 9-A (Foundation)', email: 'meera.i@greenwood.edu', password: 'password123', rollNo: 'SCH-0903', house: 'Emerald' }
];

const INITIAL_COURSES = [
  { id: 101, name: 'Advanced Mathematics & Algebra', credits: 4, facultyName: 'Dr. R. Sharma (HOD)', department: 'Secondary Wing', code: 'MATH-10' },
  { id: 102, name: 'Physics & Experimental Lab', credits: 4, facultyName: 'Prof. Anjali Verma', department: 'Science Wing', code: 'PHYS-12' },
  { id: 103, name: 'Computer Applications & Coding', credits: 3, facultyName: 'Mr. Vikram Sen', department: 'Computer Wing', code: 'COMP-11' },
  { id: 104, name: 'English Literature & Composition', credits: 3, facultyName: 'Mrs. Evelyn Vance', department: 'Language Wing', code: 'ENG-10' },
  { id: 105, name: 'Environmental Science & Biology', credits: 3, facultyName: 'Dr. Priya Mehta', department: 'Science Wing', code: 'BIO-09' }
];

const INITIAL_FACULTY = [
  { id: 1, name: 'Dr. R. Sharma', email: 'r.sharma@greenwood.edu', department: 'Mathematics Wing', role: 'Head of Department & Vice Principal', courses: ['Algebra', 'Calculus'] },
  { id: 2, name: 'Prof. Anjali Verma', email: 'a.verma@greenwood.edu', department: 'Science Wing', role: 'Senior Physics Teacher', courses: ['Applied Physics', 'Lab Mechanics'] },
  { id: 3, name: 'Mr. Vikram Sen', email: 'v.sen@greenwood.edu', department: 'Computer Wing', role: 'Lead IT & Programming Faculty', courses: ['Java & Python', 'Web Development'] },
  { id: 4, name: 'Mrs. Evelyn Vance', email: 'e.vance@greenwood.edu', department: 'Languages Wing', role: 'Senior English Master', courses: ['English Literature', 'Public Speaking'] },
  { id: 5, name: 'Dr. Priya Mehta', email: 'p.mehta@greenwood.edu', department: 'Life Sciences', role: 'Biology Coordinator', courses: ['Genetics', 'Environmental Studies'] }
];

// Helper to check if Spring Boot is reachable
export async function checkBackendConnection() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response.ok;
  } catch {
    return false;
  }
}

// Student operations
export async function fetchStudents(backendActive) {
  if (backendActive) {
    try {
      const res = await fetch(API_BASE_URL);
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('sms_students', JSON.stringify(data));
        return data;
      }
    } catch (err) {
      console.warn('Backend fetch failed, falling back to local storage:', err);
    }
  }

  // Local storage fallback
  const stored = localStorage.getItem('sms_students');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
  }
  localStorage.setItem('sms_students', JSON.stringify(INITIAL_STUDENTS));
  return INITIAL_STUDENTS;
}

export async function createStudentApi(student, backendActive) {
  if (backendActive) {
    try {
      const res = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('Backend create failed, saving locally:', err);
    }
  }

  // Local fallback
  const students = await fetchStudents(false);
  const newId = students.length > 0 ? Math.max(...students.map(s => s.id || 0)) + 1 : 1;
  const newStudent = { ...student, id: newId };
  const updated = [newStudent, ...students];
  localStorage.setItem('sms_students', JSON.stringify(updated));
  return newStudent;
}

export async function updateStudentApi(id, updatedData, backendActive) {
  if (backendActive) {
    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('Backend update failed, updating locally:', err);
    }
  }

  // Local fallback
  const students = await fetchStudents(false);
  const updated = students.map(s => s.id === id ? { ...s, ...updatedData } : s);
  localStorage.setItem('sms_students', JSON.stringify(updated));
  return { ...updatedData, id };
}

export async function deleteStudentApi(id, backendActive) {
  if (backendActive) {
    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        return true;
      }
    } catch (err) {
      console.warn('Backend delete failed, removing locally:', err);
    }
  }

  // Local fallback
  const students = await fetchStudents(false);
  const updated = students.filter(s => s.id !== id);
  localStorage.setItem('sms_students', JSON.stringify(updated));
  return true;
}

// Course operations
export function fetchCourses() {
  const stored = localStorage.getItem('sms_courses');
  if (stored) {
    try { return JSON.parse(stored); } catch (e) { console.error(e); }
  }
  localStorage.setItem('sms_courses', JSON.stringify(INITIAL_COURSES));
  return INITIAL_COURSES;
}

export function createCourseApi(course) {
  const courses = fetchCourses();
  const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id || 0)) + 1 : 101;
  const newCourse = { ...course, id: newId };
  const updated = [newCourse, ...courses];
  localStorage.setItem('sms_courses', JSON.stringify(updated));
  return newCourse;
}

export function deleteCourseApi(id) {
  const courses = fetchCourses();
  const updated = courses.filter(c => c.id !== id);
  localStorage.setItem('sms_courses', JSON.stringify(updated));
  return true;
}

// Faculty operations
export function fetchFaculty() {
  const stored = localStorage.getItem('sms_faculty');
  if (stored) {
    try { return JSON.parse(stored); } catch (e) { console.error(e); }
  }
  localStorage.setItem('sms_faculty', JSON.stringify(INITIAL_FACULTY));
  return INITIAL_FACULTY;
}

export function createFacultyApi(facultyMember) {
  const faculty = fetchFaculty();
  const newId = faculty.length > 0 ? Math.max(...faculty.map(f => f.id || 0)) + 1 : 1;
  const newFaculty = { ...facultyMember, id: newId };
  const updated = [newFaculty, ...faculty];
  localStorage.setItem('sms_faculty', JSON.stringify(updated));
  return newFaculty;
}

export function resetAllData() {
  localStorage.setItem('sms_students', JSON.stringify(INITIAL_STUDENTS));
  localStorage.setItem('sms_courses', JSON.stringify(INITIAL_COURSES));
  localStorage.setItem('sms_faculty', JSON.stringify(INITIAL_FACULTY));
}
