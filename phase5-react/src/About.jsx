function About() {
  const syllabusOutcomes = [
    { code: 'LO1', name: 'Java Programming & OOP Fundamentals', details: 'Core syntax, classes, objects, access modifiers, constructors, and encapsulation.' },
    { code: 'LO2', name: 'Inheritance & Custom Exception Handling', details: 'Person superclass, specialized Student and Faculty subclasses, and InvalidEnrollmentException.' },
    { code: 'LO3', name: 'Client & Server-Side Programming', details: 'Java Servlets handling HTTP GET/POST, session authentication, and Apache Tomcat 10 deployment.' },
    { code: 'LO4', name: 'JavaScript for Interactive Web Development', details: 'DOM manipulation, dynamic style changing, form validation, and event handling.' },
    { code: 'LO5', name: 'React Framework for Modern Web Apps', details: 'Single Page Application (SPA), useState, useEffect, React Router v7, and modular component hierarchy.' },
    { code: 'LO6', name: 'Spring Boot for Enterprise Web Services', details: 'Spring Data JPA, Hibernate ORM, REST Controller endpoints, and MySQL database persistence.' },
  ];

  const dbTables = [
    { name: 'students', fields: 'id (PK), name, email (UQ), password, department', role: 'Stores student credentials and academic department' },
    { name: 'faculty', fields: 'id (PK), name, email (UQ), password, department', role: 'Faculty instructors credentials and departments' },
    { name: 'courses', fields: 'id (PK), name, credits, faculty_id (FK)', role: 'Curriculum catalog linked to instructor' },
    { name: 'enrollments', fields: 'id (PK), student_id (FK), course_id (FK), grade', role: 'Many-to-many relationship with letter grades' }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">About the Project</h1>
          <p className="page-subtitle">
            Comprehensive documentation of the Student Management System built for the Full Stack Java Programming curriculum.
          </p>
        </div>
      </div>

      <div className="about-grid">
        {/* Project Overview Card */}
        <div className="about-card col-span-2">
          <h2>Project Overview</h2>
          <p>
            The <strong>Student Management System (SMS)</strong> is an end-to-end multi-tier software project developed to showcase the entire web development lifecycle. From core Object-Oriented principles in Java through database persistence, server-side servlets, client-side scripts, reactive interfaces with React 19, up to cloud-ready RESTful microservices with Spring Boot.
          </p>
          <div className="tech-tags">
            <span className="tech-tag">Java 17+</span>
            <span className="tech-tag">MySQL</span>
            <span className="tech-tag">JDBC</span>
            <span className="tech-tag">Servlets & JSP</span>
            <span className="tech-tag">Apache Tomcat</span>
            <span className="tech-tag">JavaScript DOM</span>
            <span className="tech-tag">React 19</span>
            <span className="tech-tag">Vite</span>
            <span className="tech-tag">React Router v7</span>
            <span className="tech-tag">Spring Boot 3</span>
            <span className="tech-tag">Spring Data JPA</span>
            <span className="tech-tag">Hibernate</span>
          </div>
        </div>

        {/* Syllabus Outcomes */}
        <div className="about-card col-span-2">
          <h2>Syllabus Learning Outcomes (LO1 - LO6)</h2>
          <div className="outcome-list">
            {syllabusOutcomes.map((item, idx) => (
              <div key={idx} className="outcome-item">
                <span className="outcome-badge">{item.code}</span>
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
          <h2>Relational Database Schema (MySQL)</h2>
          <p className="mb-4">Database: <code>student_management_system</code></p>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Table</th>
                  <th>Columns & Keys</th>
                  <th>Description</th>
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

        {/* Quick Launch Guide */}
        <div className="about-card col-span-2">
          <h2>Execution & Verification Commands</h2>
          <div className="code-block-list">
            <div className="code-card">
              <h4>1. Core Java OOP (Phase 1)</h4>
              <pre><code>cd phase1-core-java{'\n'}javac -d . *.java{'\n'}java app.Main</code></pre>
            </div>

            <div className="code-card">
              <h4>2. React Single Page App (Phase 5)</h4>
              <pre><code>cd phase5-react{'\n'}npm install{'\n'}npm run dev</code></pre>
            </div>

            <div className="code-card">
              <h4>3. Spring Boot REST API (Phase 6)</h4>
              <pre><code>cd phase6-spring-boot{'\n'}.\mvnw.cmd spring-boot:run</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;