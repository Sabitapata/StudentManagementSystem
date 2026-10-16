import { NavLink } from 'react-router-dom';

function Navbar({ isConnected, onCheckConnection, checking }) {
  return (
    <header className="navbar">
      {/* Top Academic Ribbon */}
      <div className="top-motto-bar">
        <div className="motto-container">
          <span className="motto-text">🏛️ <em>Sapientia et Virtus</em> &mdash; Wisdom &bull; Integrity &bull; Academic Excellence</span>
          <span className="academic-session">Academic Session: 2026&ndash;2027</span>
        </div>
      </div>

      <div className="nav-container">
        <NavLink to="/" className="nav-brand">
          <div className="school-crest">
            <svg viewBox="0 0 48 48" fill="none" className="crest-svg">
              <path d="M24 4L6 12V24C6 34.5 13.8 44.2 24 47C34.2 44.2 42 34.5 42 24V12L24 4Z" fill="#152b47" stroke="#c27803" strokeWidth="2.5"/>
              <path d="M24 8L10 14.5V23.5C10 31.8 16 39.5 24 42C32 39.5 38 31.8 38 23.5V14.5L24 8Z" stroke="#fef3c7" strokeWidth="1" strokeDasharray="2 2"/>
              <path d="M24 16L14 21L24 26L34 21L24 16Z" fill="#c27803"/>
              <path d="M18 24.5V30C18 32.5 20.7 34.5 24 34.5C27.3 34.5 30 32.5 30 30V24.5" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round"/>
              <path d="M34 21V28" stroke="#fef3c7" strokeWidth="2"/>
            </svg>
          </div>
          <div className="brand-text">
            <span className="school-name">GREENWOOD ACADEMY</span>
            <span className="portal-label">Official Student & School Management Portal</span>
          </div>
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <span className="nav-icon">🏛️</span>
            Dashboard
          </NavLink>
          <NavLink to="/students" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <span className="nav-icon">🎒</span>
            Students
          </NavLink>
          <NavLink to="/courses" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <span className="nav-icon">📚</span>
            Subjects
          </NavLink>
          <NavLink to="/faculty" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <span className="nav-icon">👨‍🏫</span>
            Teachers
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <span className="nav-icon">📜</span>
            Charter
          </NavLink>
        </nav>

        <div className="nav-status-group">
          <div className={`status-pill ${isConnected ? 'online' : 'offline'}`} title={isConnected ? 'Connected to Spring Boot API (:8081)' : 'Running in Offline / Local School Cache'}>
            <span className="status-dot"></span>
            <span className="status-text">{isConnected ? 'Server Online' : 'School Cache Active'}</span>
          </div>
          <button
            onClick={onCheckConnection}
            className={`btn-icon ${checking ? 'rotating' : ''}`}
            title="Refresh Connection"
            aria-label="Refresh connection"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <polyline points="23 4 23 10 17 10"/>
              <polyline points="1 20 1 14 7 14"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
