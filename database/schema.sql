CREATE DATABASE IF NOT EXISTS student_management_system;
USE student_management_system;

-- Table: Faculty
CREATE TABLE IF NOT EXISTS faculty (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    department VARCHAR(50)
);

-- Table: Students
CREATE TABLE IF NOT EXISTS students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    department VARCHAR(50)
);

-- Table: Courses
CREATE TABLE IF NOT EXISTS courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    credits INT NOT NULL,
    faculty_id INT,
    FOREIGN KEY (faculty_id) REFERENCES faculty(id)
);

-- Table: Enrollments
CREATE TABLE IF NOT EXISTS enrollments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    grade VARCHAR(2),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- =========================================================================
-- Sample Seed Data
-- =========================================================================

-- Seed Faculty
INSERT INTO faculty (id, name, email, password, department) VALUES
(1, 'Dr. Sharma', 'sharma@college.edu', 'pass123', 'Computer Science'),
(2, 'Prof. Anjali Verma', 'anjali@college.edu', 'pass123', 'Data Science'),
(3, 'Dr. Rajesh Rao', 'rajesh@college.edu', 'pass123', 'Artificial Intelligence'),
(4, 'Prof. Vikram Sen', 'vikram@college.edu', 'pass123', 'Information Technology'),
(5, 'Dr. Priya Mehta', 'priya@college.edu', 'pass123', 'Cyber Security')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Seed Students
INSERT INTO students (id, name, email, password, department) VALUES
(1, 'Alice Walker', 'alice@college.edu', 'alicepass', 'Data Science'),
(2, 'Bob Smith', 'bob@college.edu', 'bobpass', 'Computer Science'),
(3, 'Charlie Davis', 'charlie@college.edu', 'charliepass', 'Artificial Intelligence'),
(4, 'Diana Prince', 'diana@college.edu', 'dianapass', 'Data Science'),
(5, 'Ethan Hunt', 'ethan@college.edu', 'ethanpass', 'Cyber Security'),
(6, 'Fiona Gallagher', 'fiona@college.edu', 'fionapass', 'Information Technology')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Seed Courses
INSERT INTO courses (id, name, credits, faculty_id) VALUES
(101, 'Full Stack Java Programming', 4, 1),
(102, 'Database Management Systems', 3, 2),
(103, 'Machine Learning & AI', 4, 3),
(104, 'Web Technologies & React', 3, 4),
(105, 'Network & Cloud Security', 3, 5)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Seed Enrollments
INSERT INTO enrollments (id, student_id, course_id, grade) VALUES
(1, 1, 101, 'A'),
(2, 2, 101, 'B'),
(3, 1, 102, 'A'),
(4, 3, 103, 'A'),
(5, 4, 102, 'B'),
(6, 5, 105, 'A')
ON DUPLICATE KEY UPDATE grade=VALUES(grade);
