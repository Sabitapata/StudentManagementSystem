import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchStudents, fetchCourses, fetchFaculty } from './api';

function Home({ isConnected }) {
  const [stats, setStats] = useState({
    studentsCount: 0,
    coursesCount: 0,
    facultyCount: 0,
    classesCount: 0
  });

  useEffect(() => {
    async function getStats() {
      const s = await fetchStudents(isConnected);
      const c = fetchCourses();
      const f = fetchFaculty();
      const classes = new Set(s.map(item => item.department));

      setStats({
        studentsCount: s.length,
        coursesCount: c.length,
        facultyCount: f.length,
        classesCount: classes.size || 4
      });
    }
    getStats();
  }, [isConnected]);

  const schoolHouses = [
    { name: 'Sapphire House', color: '#1d4ed8', motto: 'Truth & Valor', symbol: '🦅' },
    { name: 'Ruby House', color: '#b91c1c', motto: 'Courage & Passion', symbol: '🦁' },
    { name: 'Emerald House', color: '#15803d', motto: 'Harmony & Growth', symbol: '🌲' },
    { name: 'Topaz House', color: '#b45309', motto: 'Wisdom & Light', symbol: '☀️' },
  ];

  return (
    <div className="school-dashboard">
      {/* School Blackboard Noticeboard */}
      <section className="blackboard-noticeboard">
        <div className="blackboard-frame">
          <div className="blackboard-surface">
            <div className="chalk-header">
              <span className="chalk-pin">📌</span>
              <span className="chalk-title">DAILY SCHOOL NOTICE BOARD &bull; MORNING ASSEMBLY</span>
              <span className="chalk-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>
            <div className="chalk-content">
              <div className="notice-item">
                <span className="notice-tag tag-exam">Exams</span>
                <p>Term-I Assessment schedules have been published. Collect syllabus sheets from your respective Class Teachers.</p>
              </div>
              <div className="notice-item">
                <span className="notice-tag tag-sports">Sports</span>
                <p>Inter-House Cricket & Basketball Tournament trials will be conducted this Friday at 3:30 PM on the Main Oval.</p>
              </div>
              <div className="notice-item">
                <span className="notice-tag tag-event">Event</span>
                <p>Annual Science & Robotics Exhibition registrations close tomorrow at the IT Lab.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Welcome from Principal's Desk */}
      <section className="school-hero">
        <div className="school-badge-pill">
          <span>🏅</span> Greenwood Academy &bull; Nurturing Young Leaders Since 1998
        </div>
        <h1 className="school-hero-title">
          Inspiring Academic Excellence <br />
          <span className="gold-text">Student Information System</span>
        </h1>
        <p className="school-hero-desc">
          Welcome to the centralized Greenwood School portal. Here administrators, teachers, and guardians track student attendance, academic curriculum, faculty assignments, and holistic student growth.
        </p>

        <div className="school-hero-actions">
          <Link to="/students" className="btn btn-school-primary btn-lg">
            <span>🎒</span> Student Directory &amp; Admissions
          </Link>
          <Link to="/courses" className="btn btn-school-secondary btn-lg">
            <span>📚</span> Subjects &amp; Curriculum
          </Link>
          <Link to="/faculty" className="btn btn-school-outline btn-lg">
            <span>👨‍🏫</span> Faculty Members
          </Link>
        </div>
      </section>

      {/* Campus Key Metrics */}
      <section className="school-metrics-grid">
        <div className="school-stat-card">
          <div className="stat-icon-wrapper icon-navy">
            <span>🎓</span>
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.studentsCount}</span>
            <span className="stat-title">Enrolled Students</span>
            <span className="stat-sub">Across All Classes</span>
          </div>
        </div>

        <div className="school-stat-card">
          <div className="stat-icon-wrapper icon-gold">
            <span>📖</span>
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.coursesCount}</span>
            <span className="stat-title">Academic Subjects</span>
            <span className="stat-sub">Curriculum 2026-27</span>
          </div>
        </div>

        <div className="school-stat-card">
          <div className="stat-icon-wrapper icon-crimson">
            <span>👨‍🏫</span>
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.facultyCount}</span>
            <span className="stat-title">Teaching Staff</span>
            <span className="stat-sub">Subject Specialists</span>
          </div>
        </div>

        <div className="school-stat-card">
          <div className="stat-icon-wrapper icon-green">
            <span>🏫</span>
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.classesCount}</span>
            <span className="stat-title">Active Class Sections</span>
            <span className="stat-sub">Primary to Senior Secondary</span>
          </div>
        </div>
      </section>

      {/* School House System */}
      <section className="house-system-section">
        <div className="section-title-wrap">
          <h2 className="section-title">The Four School Houses</h2>
          <p className="section-subtitle">Promoting leadership, team spirit, sportsmanship, and academic camaraderie.</p>
        </div>

        <div className="houses-grid">
          {schoolHouses.map((house, idx) => (
            <div key={idx} className="house-card" style={{ borderColor: house.color }}>
              <div className="house-crest" style={{ background: house.color }}>
                {house.symbol}
              </div>
              <h3 className="house-name" style={{ color: house.color }}>{house.name}</h3>
              <p className="house-motto">"{house.motto}"</p>
              <div className="house-stats">
                <span>Active Competitions: <strong>3</strong></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* System Sync Banner */}
      <section className="school-sync-banner">
        <div className="sync-icon">
          {isConnected ? '🏛️' : '📁'}
        </div>
        <div className="sync-details">
          <h3>
            {isConnected
              ? 'Campus Server Synchronized (MySQL Live Backend)'
              : 'School Local Storage Mode Active'}
          </h3>
          <p>
            {isConnected
              ? 'Connected to Spring Boot API on port 8081. Student admission updates and class assignments are actively saved to MySQL.'
              : 'Spring Boot REST backend is currently offline. All student admissions, course modifications, and faculty records are safely stored in your browser cache.'}
          </p>
        </div>
        <Link to="/students" className="btn btn-school-primary btn-sm">
          Open Admissions
        </Link>
      </section>
    </div>
  );
}

export default Home;