# Student Management System

A full-stack Student Management System built as part of the **Full Stack Java Programming** syllabus (BE Data Science). This project demonstrates the complete web development stack — from core Java OOP concepts through to a modern React frontend and a Spring Boot REST API — all backed by a shared MySQL database.

## Features

- **Student / Faculty / Course / Enrollment management** with full CRUD operations
- **User authentication** — login and registration with server-side validation
- **Interactive JavaScript demos** — DOM manipulation, email validation, dynamic UI
- **Single-page React application** — client-side routing, component state, and props
- **RESTful API** built with Spring Boot and Spring Data JPA

## Tech Stack

| Layer | Technology |
|---|---|
| Core Logic | Java (OOP, Inheritance, Custom Exceptions) |
| Database Access | JDBC |
| Database | MySQL |
| Server-side Web | Java Servlets, JSP, Apache Tomcat |
| Client-side Scripting | HTML, CSS, JavaScript, DOM |
| Frontend Framework | React (Hooks, React Router) |
| Backend API | Spring Boot, Spring Data JPA |

## Project Structure

This repository is organized by development phase, matching how the project was built:

```
StudentManagementSystem/
├── phase1-core-java/        # OOP classes: Person, Student, Faculty, Course, Enrollment
├── phase2-jdbc/             # DAO classes for MySQL connectivity
├── phase3-servlet-jsp/      # Login/Registration via Servlets, deployed on Tomcat
├── phase4-javascript-dom/   # Standalone JS/DOM demo pages
├── phase5-react/            # React single-page application
├── phase6-spring-boot/      # Spring Boot REST API (Student entity + CRUD endpoints)
└── database/
    └── schema.sql           # MySQL table definitions
```

## Architecture Overview

1. **Core Java (Phase 1)** — Models the domain with classes like `Student`, `Faculty`, `Course`, and `Enrollment`, using inheritance (`Person` as a base class) and a custom `InvalidEnrollmentException`.
2. **JDBC Layer (Phase 2)** — DAO classes (`StudentDAO`, `FacultyDAO`, `CourseDAO`, `EnrollmentDAO`) handle all database reads/writes via `PreparedStatement`.
3. **Servlets/JSP (Phase 3)** — A login and registration flow served via Java Servlets on Apache Tomcat, validating credentials directly against MySQL.
4. **JavaScript/DOM (Phase 4)** — Client-side interactivity: email format validation, a DOM-driven background color changer, and a small demo site with tab navigation.
5. **React (Phase 5)** — A single-page application demonstrating Hooks (`useState`), React Router for navigation, and component composition via props.
6. **Spring Boot (Phase 6)** — A RESTful API exposing the `students` table via `GET`, `POST`, `PUT`, and `DELETE` endpoints, built with Spring Data JPA.

## Getting Started

### Prerequisites
- JDK 17+
- MySQL Server
- Node.js (for the React app)
- Eclipse IDE (for the Servlet/JSP and core Java modules)
- VS Code (for React and Spring Boot)

### Database Setup
1. Create the database and tables using `database/schema.sql`:
   ```sql
   mysql -u root -p < database/schema.sql
   ```

### Running Each Module

**Core Java (Phase 1):**
```
cd phase1-core-java
javac *.java
java Main
```

**Servlet/JSP App (Phase 3):**
- Import as a Dynamic Web Project in Eclipse
- Configure Apache Tomcat as the server runtime
- Update the MySQL password in `LoginServlet.java` and `RegisterServlet.java`
- Run on Server, then visit `http://localhost:8080/StudentManagementWeb/login.html`

**React App (Phase 5):**
```
cd phase5-react
npm install
npm run dev
```
Visit `http://localhost:5173`

**Spring Boot API (Phase 6):**
- Update the MySQL password in `application.properties`
- Run `StudentApiApplication.java`
- Visit `http://localhost:8081/api/students`

## Syllabus Coverage

This project was built to cover the "Full Stack Java Programming" course outcomes:
- LO1: Java Programming and OOP fundamentals
- LO2: Inheritance and Exception Handling
- LO3: Client and Server Side Programming
- LO4: JavaScript for interactive Web Development
- LO5: React framework for real-world applications
- LO6: Spring Framework for enterprise-level applications

## Author

Built as a mini project for the Full Stack Java Programming course.
