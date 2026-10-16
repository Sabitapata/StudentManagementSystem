import { NavLink } from 'react-router-dom';

function Navbar({ isConnected, onCheckConnection, checking }) {
  return (
    <header className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="nav-brand">
          <div className="brand-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-title">EduPortal</span>
            <span className="brand-subtitle">Student Management System</span>
          </div>
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="nav-svg">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Dashboard
          </NavLink>
          <NavLink to="/students" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="nav-svg">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Students
          </NavLink>
          <NavLink to="/courses" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="nav-svg">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            Courses
          </NavLink>
          <NavLink to="/faculty" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="nav-svg">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <polyline points="16 11 18 13 22 9"/>
            </svg>
            Faculty
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="nav-svg">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            About
          </NavLink>
        </nav>

        <div className="nav-status-group">
          <div className={`status-pill ${isConnected ? 'online' : 'offline'}`} title={isConnected ? 'Connected to Spring Boot API (:8081)' : 'Running in Offline / Local Mode'}>
            <span className="status-dot"></span>
            <span className="status-text">{isConnected ? 'Spring Boot API Online' : 'Local / Offline Mode'}</span>
          </div>
          <button
            onClick={onCheckConnection}
            className={`btn-icon ${checking ? 'rotating' : ''}`}
            title="Check API Status"
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
