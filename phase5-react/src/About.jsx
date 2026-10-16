function About() {
  const syllabusOutcomes = [
    { code: 'LO1', name: 'Java OOP Fundamentals', details: 'Domain modeling for School: Person superclass, Student and Faculty subclasses, encapsulation of academic data.' },
    { code: 'LO2', name: 'Inheritance & Custom Exception Handling', details: 'Hierarchy with InvalidEnrollmentException when school grades or admission bounds are violated.' },
    { code: 'LO3', name: 'Client & Server-Side Programming', details: 'School portal login & staff verification via Java Servlets and JSP deployed on Apache Tomcat 10.' },
    { code: 'LO4', name: 'JavaScript DOM Manipulation', details: 'Client-side email verification, dynamic noticeboards, and school portal tab navigation.' },
    { code: 'LO5', name: 'React 19 Single Page App', details: 'Rich school portal interface, reactive admissions roster, subject tracking, and state persistence.' },
    { code: 'LO6', name: 'Spring Boot REST Microservices', details: 'Enterprise backend managing student MySQL persistence with Spring Data JPA and Hibernate ORM.' },
  ];

  const dbTables = [
    { name: 'students', fields: 'id, name, email, password, department (class_section)', role: 'Enrolled students, roll records, and assigned academic class' },
    { name: 'faculty', fields: 'id, name, email, password, department (wing)', role: 'Teaching staff, academic wing, and credentials' },
    { name: 'courses', fields: 'id, name, credits (periods), faculty_id', role: 'School curriculum, weekly periods, and subject teacher' },
    { name: 'enrollments', fields: 'id, student_id, course_id, grade', role: 'Student report cards, marks, and academic evaluations' }
  ];

  return (
    <div className="page-container">
      <div className="school-section-header">
        <div className="header-title-box">
          <div className="header-crest-icon">📜</div>
          <div>
            <h1 className="school-page-title">School Charter &amp; Architecture</h1>
            <p className="school-page-subtitle">
              Academic vision, curriculum syllabus outcomes (LO1 - LO6), and software architecture.
            </p>
          </div>
        </div>
      </div>

      <div className="about-grid">
        {/* School Creed Card */}
        <div className="school-charter-card col-span-2">
          <div className="charter-crest-header">
            <span>🏛️</span>
            <div>
              <h2>Greenwood Academy &bull; Institutional Charter</h2>
              <p className="motto-italic">"Sapientia et Virtus &mdash; Wisdom, Integrity, and Academic Excellence"</p>
            </div>
          </div>
          <p className="charter-text">
            The Greenwood School Management System is designed to streamline academic operations across all tiers of schooling. From student admissions and roll registries to curriculum subject allocations, teacher coordination, and examination reporting, this portal provides a reliable, secure, and user-friendly experience for administrators, educators, and scholars.
          </p>
          <div className="school-creed-badges">
            <span className="creed-pill">🌟 Founded 1998</span>
            <span className="creed-pill">🏆 4 School Houses</span>
            <span className="creed-pill">📚 Comprehensive Syllabus</span>
            <span className="creed-pill">⚡ Powered by Java &amp; React</span>
          </div>
        </div>

        {/* Syllabus Outcomes */}
        <div className="about-card col-span-2">
          <h2>Academic &amp; Engineering Learning Outcomes (LO1 &ndash; LO6)</h2>
          <div className="outcome-list">
            {syllabusOutcomes.map((item, idx) => (
              <div key={idx} className="outcome-item">
                <span className="school-outcome-badge">{item.code}</span>
                <div className="outcome-text">
                  <strong>{item.name}</strong>
                  <p>{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Database Schema */}
        <div className="about-card col-span-2">
          <h2>School Relational Database Schema (MySQL)</h2>
          <p className="mb-4">Database: <code>student_management_system</code></p>
          <div className="school-table-container">
            <table className="school-data-table">
              <thead>
                <tr>
                  <th>Table</th>
                  <th>Fields &amp; Relations</th>
                  <th>School Function</th>
                </tr>
              </thead>
              <tbody>
                {dbTables.map((t, idx) => (
                  <tr key={idx}>
                    <td><strong>{t.name}</strong></td>
                    <td><code>{t.fields}</code></td>
                    <td>{t.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Commands */}
        <div className="about-card col-span-2">
          <h2>System Launch Commands</h2>
          <div className="code-block-list">
            <div className="school-code-card">
              <h4>1. Core Java Domain Model (Phase 1)</h4>
              <pre><code>cd phase1-core-java{'\n'}javac -d . *.java{'\n'}java app.Main</code></pre>
            </div>

            <div className="school-code-card">
              <h4>2. React 19 School Portal (Phase 5)</h4>
              <pre><code>cd phase5-react{'\n'}npm install{'\n'}npm run dev</code></pre>
            </div>

            <div className="school-code-card">
              <h4>3. Spring Boot REST Microservice (Phase 6)</h4>
              <pre><code>cd phase6-spring-boot{'\n'}.\mvnw.cmd spring-boot:run</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;