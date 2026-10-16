import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchStudents, fetchCourses, fetchFaculty } from './api';

function Home({ isConnected }) {
  const [stats, setStats] = useState({
    studentsCount: 0,
    coursesCount: 0,
    facultyCount: 0,
    deptCount: 0
  });

  useEffect(() => {
    async function getStats() {
      const s = await fetchStudents(isConnected);
      const c = fetchCourses();
      const f = fetchFaculty();
      const depts = new Set([...s.map(item => item.department), ...c.map(item => item.department)]);

      setStats({
        studentsCount: s.length,
        coursesCount: c.length,
        facultyCount: f.length,
        deptCount: depts.size
      });
    }
    getStats();
  }, [isConnected]);

  const phases = [
    {
      num: 'Phase 1',
      title: 'Core Java OOP',
      desc: 'Inheritance with Person superclass, Student & Faculty subclasses, custom InvalidEnrollmentException, and polymorphic methods.',
      badge: 'OOP Architecture'
    },
    {
      num: 'Phase 2',
      title: 'MySQL JDBC DAO',
      desc: 'Robust Data Access Objects (StudentDAO, CourseDAO, FacultyDAO) using PreparedStatements to prevent SQL injection.',
      badge: 'Database Integration'
    },
    {
      num: 'Phase 3',
      title: 'Servlets & JSP',
      desc: 'Login and Registration lifecycle running on Apache Tomcat with server-side session authentication.',
      badge: 'Server-Side Web'
    },
    {
      num: 'Phase 4',
      title: 'JavaScript & DOM',
      desc: 'Client-side email validation with RegExp, DOM event listeners, and interactive UI state management.',
      badge: 'Client Interactivity'
    },
    {
      num: 'Phase 5',
      title: 'React Single Page App',
      desc: 'Modern React 19 UI with client-side routing, React Router v7, custom Hooks, search/filter, and optimistic state updates.',
      badge: 'Frontend Framework'
    },
    {
      num: 'Phase 6',
      title: 'Spring Boot REST API',
      desc: 'Enterprise RESTful endpoints on port 8081 with Spring Data JPA and Hibernate ORM for seamless MySQL persistence.',
      badge: 'Enterprise Backend'
    }
  ];

  return (
    <div className="home-dashboard">
      {/* Hero Banner */}
      <section className="hero-section">
        <div className="hero-badge">
          <span>🎓</span> Full Stack Academic Platform
        </div>
        <h1 className="hero-title">
          Smart Student Management <br />
          <span className="gradient-text">Unified Portal</span>
        </h1>
        <p className="hero-description">
          An enterprise-grade, multi-tier academic solution integrating Core Java, JDBC, Servlets, modern React 19, and Spring Boot REST APIs with complete CRUD functionality.
        </p>

        <div className="hero-actions">
          <Link to="/students" className="btn btn-primary btn-lg">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Manage Students
          </Link>
          <Link to="/courses" className="btn btn-outline btn-lg">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            Explore Courses
          </Link>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="metrics-row">
        <div className="metric-card">
          <div className="metric-icon metric-indigo">👨‍🎓</div>
          <div className="metric-data">
            <span className="metric-number">{stats.studentsCount}</span>
            <span className="metric-label">Enrolled Students</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon metric-cyan">📚</div>
          <div className="metric-data">
            <span className="metric-number">{stats.coursesCount}</span>
            <span className="metric-label">Active Courses</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon metric-emerald">👨‍🏫</div>
          <div className="metric-data">
            <span className="metric-number">{stats.facultyCount}</span>
            <span className="metric-label">Faculty Instructors</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon metric-purple">🏛️</div>
          <div className="metric-data">
            <span className="metric-number">{stats.deptCount}</span>
            <span className="metric-label">Academic Departments</span>
          </div>
        </div>
      </section>

      {/* Live System Connectivity Notice */}
      <section className="status-banner-card">
        <div className="status-banner-icon">
          {isConnected ? '⚡' : '💾'}
        </div>
        <div className="status-banner-info">
          <h3>
            {isConnected
              ? 'Connected to Spring Boot REST API'
              : 'Running in Resilient Local Storage Mode'}
          </h3>
          <p>
            {isConnected
              ? 'Live synchronization active on http://localhost:8081/api/students. Changes persist directly into MySQL.'
              : 'Spring Boot server is offline or unreachable on port 8081. Student, Course, and Faculty records are seamlessly stored and managed in your browser localStorage.'}
          </p>
        </div>
        <div className="status-banner-action">
          <Link to="/students" className="btn btn-sm btn-outline">
            Open Student Directory
          </Link>
        </div>
      </section>

      {/* 6-Phase Architecture Roadmap */}
      <section className="architecture-section">
        <div className="section-heading">
          <h2>Full Stack Java Programming Architecture</h2>
          <p>Designed and built following the 6 progressive learning outcomes (LO1 - LO6).</p>
        </div>

        <div className="phases-grid">
          {phases.map((p, idx) => (
            <div key={idx} className="phase-card">
              <div className="phase-header">
                <span className="phase-step">{p.num}</span>
                <span className="phase-badge">{p.badge}</span>
              </div>
              <h3 className="phase-title">{p.title}</h3>
              <p className="phase-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;