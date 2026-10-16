# 🎓 Student Management System (SMS)

A full-stack, enterprise-grade academic management system built as part of the **Full Stack Java Programming** syllabus (BE Data Science). This project demonstrates the complete end-to-end software development lifecycle — from Core Java Object-Oriented Programming (OOP) concepts, MySQL JDBC data access, Java Servlets on Apache Tomcat, dynamic JavaScript DOM manipulation, to a modern single-page application built with **React 19 & Vite**, backed by a **Spring Boot REST API** with Spring Data JPA and Hibernate ORM.

---

## 🌟 Key Highlights & Features

- **Dynamic React 19 Frontend**:
  - Unified Dashboard with real-time statistics (Total Enrolled Students, Active Courses, Faculty Instructors, Academic Departments).
  - Full **CRUD** (Create, Read, Update, Delete) management for students with modal forms and validation.
  - Live search by Name, Email, or Department.
  - Department filter dropdown & view toggle (Card Grid vs. Responsive Data Table).
  - CSV export for student records.
  - Dedicated **Academic Courses** and **Faculty Mentors** directories.
  - **Smart API Fallback**: Automatically connects to the Spring Boot REST API (`http://localhost:8081/api/students`) when online; gracefully operates with persistent browser storage when running offline.
- **Spring Boot RESTful Backend (Port 8081)**:
  - Full REST endpoints (`GET`, `POST`, `PUT`, `DELETE`) with CORS support for seamless communication with the frontend.
  - Spring Data JPA with MySQL persistence.
- **Core Java & Database Layers**:
  - Class inheritance (`Person` superclass, `Student` and `Faculty` subclasses) and custom `InvalidEnrollmentException`.
  - Robust JDBC DAO pattern with `PreparedStatement` to prevent SQL injection.
  - Session-based user authentication using Java Servlets & JSP on Apache Tomcat.
  - Standalone interactive JavaScript & DOM experiments.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Key Capabilities |
|---|---|---|
| **Frontend SPA** | React 19, Vite, React Router v7 | Responsive UI, Hooks (`useState`, `useEffect`, `useCallback`), Card/Table views |
| **Backend API** | Spring Boot 3, Spring Data JPA, Hibernate | RESTful controllers, JSON serialization, ORM entity mapping |
| **Database** | MySQL 8.x | Normalized relational schema (`students`, `faculty`, `courses`, `enrollments`) |
| **Server-Side Web** | Java Servlets, JSP, Apache Tomcat 10 | HTTP request handling, session tracking, server authentication |
| **Database Access** | JDBC (`java.sql.*`) | DAO pattern (`StudentDAO`, `CourseDAO`, `FacultyDAO`, `EnrollmentDAO`) |
| **Core Logic** | Java 17+ (OOP) | Inheritance, Polymorphism, Encapsulation, Custom Exceptions |
| **DOM Scripting** | HTML5, CSS3, JavaScript (ES6+) | Form validation, background timers, single-page DOM tab switching |

---

## 📁 Project Structure

```
StudentManagementSystem/
├── phase1-core-java/        # OOP classes: Person, Student, Faculty, Course, Enrollment, Exception
├── phase2-jdbc/             # MySQL JDBC DAO classes & connection manager
├── phase3-servlet-jsp/      # Login and registration Servlets deployed on Apache Tomcat
├── phase4-javascript-dom/   # Standalone JS DOM demos (validation, color timer, tab navigation)
├── phase5-react/            # Modern React 19 SPA (Dashboard, Students, Courses, Faculty, About)
├── phase6-spring-boot/      # Spring Boot REST API with Spring Data JPA
└── database/
    └── schema.sql           # MySQL database schema & sample seed data
```

---

## 🚀 Getting Started

### Prerequisites

- **Java Development Kit (JDK 17+)**
- **Node.js (v18+) & npm**
- **MySQL Server (8.x)**
- *Optional*: Eclipse IDE for Enterprise Java (for Tomcat/Servlets)

---

### 1. Database Setup

Create the database and seed it with initial records:

```bash
mysql -u root -p < database/schema.sql
```

This creates the `student_management_system` database with tables and sample records for students, faculty, courses, and enrollments.

---

### 2. Running the React Web Application (Phase 5)

Navigate into `phase5-react`, install dependencies, and start the development server:

```bash
cd phase5-react
npm install
npm run dev
```

Open your browser and navigate to:
👉 **`http://localhost:5173`**

*(Note: The React portal operates in resilient mode with local persistence out of the box, and automatically connects to the Spring Boot REST API whenever port 8081 is active!)*

---

### 3. Running the Spring Boot REST API (Phase 6)

1. Open `phase6-spring-boot/src/main/resources/application.properties` and verify your MySQL credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/student_management_system
   spring.datasource.username=root
   spring.datasource.password=YOUR_PASSWORD
   server.port=8081
   ```
2. Start the Spring Boot application using the included Maven wrapper:
   ```bash
   cd phase6-spring-boot
   # On Windows:
   .\mvnw.cmd spring-boot:run
   # On Linux / macOS:
   ./mvnw spring-boot:run
   ```
3. Test the REST endpoint in your browser or Postman:
   👉 **`http://localhost:8081/api/students`**

---

### 4. Running Core Java (Phase 1)

Compile and run the OOP domain model from command line:

```bash
cd phase1-core-java
javac -d . *.java
java app.Main
```

---

### 5. Running Servlet & JSP Authentication (Phase 3)

1. Import `phase3-servlet-jsp` as a **Dynamic Web Project** in Eclipse IDE or IntelliJ IDEA Ultimate.
2. Configure **Apache Tomcat 10** as the server runtime.
3. Update MySQL database credentials in `LoginServlet.java` and `RegisterServlet.java`.
4. Run on Server and navigate to:
   `http://localhost:8080/StudentManagementWeb/login.html`

---

### 6. Standalone JavaScript & DOM Demos (Phase 4)

Open any of the demo files directly in any web browser:
- `phase4-javascript-dom/demo-site.html` (DOM tab switcher and counter)
- `phase4-javascript-dom/email-validation.html` (Email regex verification)
- `phase4-javascript-dom/auto-background.html` (Color interval changer)

---

## 🎯 Syllabus & Course Learning Outcomes

| Module | Learning Outcome | Implementation in Repository |
|---|---|---|
| **LO1** | Java OOP Fundamentals | `phase1-core-java/` (`Person.java`, `Student.java`, `Faculty.java`) |
| **LO2** | Inheritance & Exception Handling | `phase1-core-java/` (`InvalidEnrollmentException.java`, `Course.java`, `Enrollment.java`) |
| **LO3** | Client & Server Side Programming | `phase2-jdbc/` & `phase3-servlet-jsp/` (`DatabaseConnection.java`, `LoginServlet.java`) |
| **LO4** | JavaScript for Interactive Web Dev | `phase4-javascript-dom/` (`email-validation.html`, `demo-site.html`) |
| **LO5** | React Framework for Modern Web Apps | `phase5-react/` (React 19, Hooks, React Router, CRUD operations) |
| **LO6** | Spring Framework for Enterprise Apps | `phase6-spring-boot/` (REST Controller, Spring Data JPA, Hibernate) |

---

## 👤 Author

Developed by **Sabitapata** as a comprehensive capstone mini-project for the **Full Stack Java Programming** syllabus (BE Data Science).
