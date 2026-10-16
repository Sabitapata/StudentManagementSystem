# 🏫 Greenwood Academy &mdash; School Management System (SMS)

[![React 19](https://img.shields.io/badge/Frontend-React_19_%2B_Vite-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Spring Boot](https://img.shields.io/badge/Backend-Spring_Boot_3-6DB33F?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java 17+](https://img.shields.io/badge/Language-Java_17%2B-ED8B00?logo=openjdk&logoColor=white)](https://openjdk.org/)
[![MySQL](https://img.shields.io/badge/Database-MySQL_8.x-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Tomcat](https://img.shields.io/badge/Server-Apache_Tomcat_10-F8DC75?logo=apachetomcat&logoColor=black)](https://tomcat.apache.org/)

A full-stack, comprehensive **School & Student Management System** built as part of the **Full Stack Java Programming** syllabus (BE Data Science). Featuring an authentic **Academy & Campus Theme** with Oxford Navy and Varsity Gold styling, this project showcases the complete end-to-end software development lifecycle &mdash; from Core Java Object-Oriented domain modeling to MySQL JDBC persistence, Apache Tomcat Servlets, JavaScript DOM manipulation, a reactive single-page school portal in **React 19**, and an enterprise **Spring Boot REST API** backed by Hibernate ORM.

> *"🏛️ Sapientia et Virtus &mdash; Wisdom, Integrity, and Academic Excellence &bull; Estd. 1998"*

---

## 🌟 Key School Features & Modules

### 1. 🏛️ Campus Dashboard & Morning Assembly Blackboard
* **Chalkboard Noticeboard**: Wooden-framed green slate noticeboard featuring live school announcements for upcoming **Examinations**, **Inter-House Sports Trials**, and **Science Exhibitions**.
* **Key Campus Metrics**: Real-time stats for total **Enrolled Scholars**, active **Curriculum Subjects**, **Teaching Faculty Specialists**, and **Class Sections**.
* **The Four School Houses**: Leadership and spirit tracked across:
  * 🦅 **Sapphire House** (*"Truth & Valor"*)
  * 🦁 **Ruby House** (*"Courage & Passion"*)
  * 🌲 **Emerald House** (*"Harmony & Growth"*)
  * ☀️ **Topaz House** (*"Wisdom & Light"*)

### 2. 🎒 Student Admissions & ID Cards
* **Physical Student Pass / ID Card Design**:
  * School lanyard header with Greenwood Academy crest.
  * Official **Roll Number** (e.g. `GW-1001`, `GW-1204`).
  * Assigned **Class & Section** (`Class 10-A Science`, `Class 12-B Computer Sci`, etc.).
  * Color-coded **School House Badge** (Sapphire, Ruby, Emerald, Topaz).
* **Full CRUD Management**: Admit new students, update academic records, or withdraw scholars with safe confirmation dialogs.
* **Class Register Table View**: Classic ledger format displaying roll number, scholar name, class, house, and parent/student contact email.
* **Instant Filtering & Search**: Real-time search across student names, roll numbers, classes, and email addresses.
* **CSV Roster Export**: Download complete student registers in standard `.csv` format with one click.

### 3. 📚 Academic Curriculum & Subjects
* **Subject Directory**: Subject codes (e.g. `MATH-10`, `PHYS-12`), weekly teaching periods (`4 Periods/Week`), and assigned Subject Masters.
* **Academic Wings**: Categorized into *Science Wing*, *Mathematics Wing*, *Computer Wing*, *Language Wing*, and *Humanities*.
* **Curriculum Management**: Add new subjects or update existing syllabi.

### 4. 👨‍🏫 Teaching Faculty & Staff
* **Educator Directory**: Profiles of Department Heads, Senior Teachers, and Academic Mentors.
* **Wing Specialization**: Displays official contact emails and assigned classes/subjects for each teacher.

### 5. ⚡ Dual-Mode API & Offline Resilience
* **Spring Boot REST Synchronization**: Directly connects to `http://localhost:8081/api/students` for live MySQL database updates.
* **Resilient School Cache**: When the backend server is offline, the portal automatically operates in local browser storage mode with sample school records, guaranteeing zero downtime.

---

## 🛠️ Multi-Tier Architecture & Tech Stack

| Phase & Layer | Technology | Architectural Function |
|---|---|---|
| **Phase 1: Core Domain** | Java 17+ OOP | Inheritance (`Person` &rarr; `Student`, `Faculty`), `InvalidEnrollmentException`, Polymorphism |
| **Phase 2: Database Layer** | MySQL JDBC | DAO pattern (`StudentDAO`, `CourseDAO`, `FacultyDAO`, `EnrollmentDAO`) with `PreparedStatement` |
| **Phase 3: Server-Side Web** | Servlets & JSP | User authentication and session tracking on **Apache Tomcat 10** |
| **Phase 4: Client Scripting** | JavaScript & DOM | Interactive form validation, interval timers, and single-page DOM tab switching |
| **Phase 5: School Portal** | React 19, Vite, React Router v7 | Responsive UI, Student ID Cards, Class Registers, Custom Hooks (`useState`, `useEffect`) |
| **Phase 6: Enterprise API** | Spring Boot 3, Spring Data JPA | RESTful controllers (`/api/students`), Hibernate ORM, and CORS configuration |

---

## 📁 Repository Structure

```
StudentManagementSystem/
├── phase1-core-java/        # OOP domain model: Person, Student, Faculty, Course, Enrollment
├── phase2-jdbc/             # MySQL JDBC DAO classes & connection manager
├── phase3-servlet-jsp/      # Login and registration Servlets on Apache Tomcat
├── phase4-javascript-dom/   # Standalone JS DOM demos (validation, background timer, tabs)
├── phase5-react/            # React 19 School Portal (Dashboard, Admissions, Subjects, Teachers, Charter)
├── phase6-spring-boot/      # Spring Boot REST API with Spring Data JPA & MySQL
├── database/
│   └── schema.sql           # MySQL database schema with complete school seed data
├── .gitignore               # Ignored build artifacts, dependencies, and environment files
└── README.md                # Comprehensive project documentation
```

---

## 🚀 Quick Launch Guide

### Prerequisites
* **Java Development Kit (JDK 17+)**
* **Node.js (v18+) & npm**
* **MySQL Server (8.x)**
* *Optional*: Eclipse IDE for Enterprise Java (for Tomcat/Servlets)

---

### Step 1: Database Setup (MySQL)
Execute the database script to create the schema and seed initial school data:
```bash
mysql -u root -p < database/schema.sql
```
*Creates `student_management_system` with seeded tables: `students`, `faculty`, `courses`, and `enrollments`.*

---

### Step 2: Run the React School Web Portal (Phase 5)
```bash
cd phase5-react
npm install
npm run dev
```
Open your browser and navigate to:
👉 **`http://localhost:5173/`**

---

### Step 3: Run the Spring Boot REST API (Phase 6)
1. Verify MySQL credentials in `phase6-spring-boot/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/student_management_system
   spring.datasource.username=root
   spring.datasource.password=YOUR_PASSWORD
   server.port=8081
   ```
2. Start the Spring Boot microservice:
   ```bash
   cd phase6-spring-boot
   # On Windows:
   .\mvnw.cmd spring-boot:run
   # On Linux / macOS:
   ./mvnw spring-boot:run
   ```
3. Test the REST endpoint in your browser:
   👉 **`http://localhost:8081/api/students`**

---

### Step 4: Run Core Java OOP (Phase 1)
```bash
cd phase1-core-java
javac -d . *.java
java app.Main
```

---

### Step 5: Run Servlet & JSP Web App (Phase 3)
1. Import `phase3-servlet-jsp` as a **Dynamic Web Project** in Eclipse IDE or IntelliJ IDEA Ultimate.
2. Configure **Apache Tomcat 10** runtime.
3. Update MySQL database password in `LoginServlet.java` and `RegisterServlet.java`.
4. Run on Server & visit: `http://localhost:8080/StudentManagementWeb/login.html`

---

### Step 6: Standalone JavaScript & DOM Experiments (Phase 4)
Open any of the standalone HTML files directly in your web browser:
* `phase4-javascript-dom/demo-site.html` (DOM navigation & counter)
* `phase4-javascript-dom/email-validation.html` (Email format validation)
* `phase4-javascript-dom/auto-background.html` (Interval background changer)

---

## 🎯 Syllabus & Learning Outcomes (LO1 &ndash; LO6)

| Learning Outcome | Syllabus Description | Implementation in Project |
|---|---|---|
| **LO1** | Java OOP Fundamentals | [`phase1-core-java/`](phase1-core-java) (`Person.java`, `Student.java`, `Faculty.java`) |
| **LO2** | Inheritance & Custom Exceptions | [`phase1-core-java/`](phase1-core-java) (`InvalidEnrollmentException.java`, `Course.java`, `Enrollment.java`) |
| **LO3** | Client & Server Side Programming | [`phase2-jdbc/`](phase2-jdbc) & [`phase3-servlet-jsp/`](phase3-servlet-jsp) (`DatabaseConnection.java`, `LoginServlet.java`) |
| **LO4** | JavaScript DOM Manipulation | [`phase4-javascript-dom/`](phase4-javascript-dom) (`email-validation.html`, `demo-site.html`) |
| **LO5** | React Framework for Modern Web Apps | [`phase5-react/`](phase5-react) (React 19, Student ID Cards, Class Registers, Hooks, Router) |
| **LO6** | Spring Framework for Enterprise Apps | [`phase6-spring-boot/`](phase6-spring-boot) (Spring Boot REST API, Spring Data JPA, Hibernate ORM) |

---

## 👤 Author

Developed by **Sabitapata** as a capstone project for the **Full Stack Java Programming** course (BE Data Science).
