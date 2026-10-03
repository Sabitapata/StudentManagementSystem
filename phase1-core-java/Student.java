package app;
import java.util.ArrayList;
import java.util.List;

// Inheritance: Student extends Person
public class Student extends Person {
    private String department;
    private List<Enrollment> enrollments; // composition: a student has many enrollments

    public Student(int id, String name, String email, String password, String department) {
        super(id, name, email, password); // calling parent constructor
        this.department = department;
        this.enrollments = new ArrayList<>();
    }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public List<Enrollment> getEnrollments() { return enrollments; }

    public void addEnrollment(Enrollment enrollment) {
        enrollments.add(enrollment);
    }

    // Method overriding (polymorphism)
    @Override
    public String getRole() {
        return "Student";
    }

    @Override
    public String toString() {
        return super.toString() + ", Department: " + department;
    }
}
