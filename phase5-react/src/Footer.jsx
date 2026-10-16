function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-col">
          <div className="footer-brand">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
            <strong>Student Management System</strong>
          </div>
          <p className="footer-desc">
            A comprehensive Full Stack academic management project spanning Core Java, JDBC, Servlets, JavaScript DOM, React 19, and Spring Boot JPA.
          </p>
        </div>

        <div className="footer-col">
          <h4>Project Architecture</h4>
          <ul className="footer-links">
            <li>Phase 1: Core Java OOP (Inheritance & Exceptions)</li>
            <li>Phase 2: MySQL JDBC DAO Layer</li>
            <li>Phase 3: Java Servlets & JSP on Apache Tomcat</li>
            <li>Phase 4: Dynamic JavaScript & DOM Manipulation</li>
            <li>Phase 5: Single-Page Application (React 19 + Vite)</li>
            <li>Phase 6: Spring Boot REST API (Port 8081)</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Course Information</h4>
          <p className="footer-desc">
            Department of Data Science & Engineering<br />
            Course: <strong>Full Stack Java Programming</strong><br />
            Outcome: Learning Outcomes 1 through 6
          </p>
          <div className="footer-badge">BE Data Science Mini Project</div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Student Management System &mdash; Created by Sabitapata</p>
      </div>
    </footer>
  );
}

export default Footer;
