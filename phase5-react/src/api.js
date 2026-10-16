// API helper to communicate with the Spring Boot REST API
// If the backend is not running, it automatically falls back to localStorage

export const API_BASE_URL = 'http://localhost:8081/api/students';

const INITIAL_STUDENTS = [
  { id: 1, name: 'Alice Walker', department: 'Data Science', email: 'alice@college.edu', password: 'password123' },
  { id: 2, name: 'Bob Smith', department: 'Computer Science', email: 'bob@college.edu', password: 'password123' },
  { id: 3, name: 'Charlie Davis', department: 'Artificial Intelligence', email: 'charlie@college.edu', password: 'password123' },
  { id: 4, name: 'Diana Prince', department: 'Data Science', email: 'diana@college.edu', password: 'password123' },
  { id: 5, name: 'Ethan Hunt', department: 'Cyber Security', email: 'ethan@college.edu', password: 'password123' },
  { id: 6, name: 'Fiona Gallagher', department: 'Information Technology', email: 'fiona@college.edu', password: 'password123' }
];

const INITIAL_COURSES = [
  { id: 101, name: 'Full Stack Java Programming', credits: 4, facultyName: 'Dr. Sharma', department: 'Computer Science', code: 'CS-401' },
  { id: 102, name: 'Database Management Systems', credits: 3, facultyName: 'Prof. Anjali Verma', department: 'Data Science', code: 'DS-302' },
  { id: 103, name: 'Machine Learning & AI', credits: 4, facultyName: 'Dr. Rajesh Rao', department: 'Artificial Intelligence', code: 'AI-403' },
  { id: 104, name: 'Web Technologies & React', credits: 3, facultyName: 'Prof. Vikram Sen', department: 'Information Technology', code: 'IT-304' },
  { id: 105, name: 'Network & Cloud Security', credits: 3, facultyName: 'Dr. Priya Mehta', department: 'Cyber Security', code: 'CY-305' }
];

const INITIAL_FACULTY = [
  { id: 1, name: 'Dr. Sharma', email: 'sharma@college.edu', department: 'Computer Science', role: 'Head of Department', courses: ['Full Stack Java'] },
  { id: 2, name: 'Prof. Anjali Verma', email: 'anjali@college.edu', department: 'Data Science', role: 'Associate Professor', courses: ['DBMS', 'Data Warehousing'] },
  { id: 3, name: 'Dr. Rajesh Rao', email: 'rajesh@college.edu', department: 'Artificial Intelligence', role: 'Professor', courses: ['Machine Learning', 'Deep Learning'] },
  { id: 4, name: 'Prof. Vikram Sen', email: 'vikram@college.edu', department: 'Information Technology', role: 'Assistant Professor', courses: ['Web Technologies', 'React'] },
  { id: 5, name: 'Dr. Priya Mehta', email: 'priya@college.edu', department: 'Cyber Security', role: 'Associate Professor', courses: ['Network Security', 'Cryptography'] }
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
        // save a copy locally
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
