function Footer() {
  return (
    <footer className="school-footer">
      <div className="footer-content">
        <div className="footer-col">
          <div className="school-footer-brand">
            <span className="footer-crest-icon">🏛️</span>
            <div>
              <strong>GREENWOOD ACADEMY</strong>
              <div className="footer-motto">"Wisdom &bull; Character &bull; Excellence"</div>
            </div>
          </div>
          <p className="footer-desc">
            An exemplary educational institution committed to comprehensive schooling, intellectual inquiry, and character development.
          </p>
          <div className="footer-campus-info">
            📍 Greenwood Campus, Academic Avenue &bull; ⏰ Bell Hours: 8:00 AM &ndash; 3:15 PM
          </div>
        </div>

        <div className="footer-col">
          <h4>Academic Structure</h4>
          <ul className="footer-links">
            <li>Primary Wing (Grades 1 &ndash; 5)</li>
            <li>Middle School Wing (Grades 6 &ndash; 8)</li>
            <li>Secondary School Wing (Grades 9 &ndash; 10)</li>
            <li>Senior Secondary Wing (Grades 11 &ndash; 12)</li>
            <li>Houses: Sapphire &bull; Ruby &bull; Emerald &bull; Topaz</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Software Architecture</h4>
          <p className="footer-desc">
            Full Stack Java Programming Capstone Project.<br />
            <strong>Tech Stack:</strong> Core Java OOP, JDBC, Tomcat Servlets, React 19, Spring Boot REST JPA, MySQL.
          </p>
          <div className="school-session-badge">Session 2026&ndash;2027</div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Greenwood Academy Student Management System &mdash; Created by Sabitapata</p>
      </div>
    </footer>
  );
}

export default Footer;
