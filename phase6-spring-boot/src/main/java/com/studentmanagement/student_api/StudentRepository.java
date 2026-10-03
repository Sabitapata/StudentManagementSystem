package com.studentmanagement.student_api;

import org.springframework.data.jpa.repository.JpaRepository;

// Extending JpaRepository automatically gives us save(), findAll(), findById(),
// deleteById(), etc. - no SQL or implementation needed!
public interface StudentRepository extends JpaRepository<Student, Integer> {
}
