package app;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class EnrollmentDAO {

    private StudentDAO studentDAO = new StudentDAO();
    private CourseDAO courseDAO = new CourseDAO();

    // Enroll a student in a course. Pass their ids.
    public void addEnrollment(int studentId, int courseId) {
        String sql = "INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, studentId);
            stmt.setInt(2, courseId);

            int rows = stmt.executeUpdate();
            System.out.println(rows + " enrollment(s) inserted.");

        } catch (SQLException e) {
            System.out.println("Error inserting enrollment:");
            e.printStackTrace();
        }
    }

    // Update the grade for a specific enrollment
    public void updateGrade(int enrollmentId, String grade) {
        String sql = "UPDATE enrollments SET grade = ? WHERE id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, grade);
            stmt.setInt(2, enrollmentId);

            int rows = stmt.executeUpdate();
            System.out.println(rows + " enrollment(s) updated.");

        } catch (SQLException e) {
            System.out.println("Error updating grade:");
            e.printStackTrace();
        }
    }

    // Get all enrollments for a given student
    public List<Enrollment> getEnrollmentsByStudent(int studentId) {
        List<Enrollment> enrollments = new ArrayList<>();
        String sql = "SELECT * FROM enrollments WHERE student_id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, studentId);

            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    Enrollment e = mapRow(rs);
                    if (e != null) enrollments.add(e);
                }
            }

        } catch (SQLException e) {
            System.out.println("Error fetching enrollments:");
            e.printStackTrace();
        }

        return enrollments;
    }

    // Helper: builds an Enrollment object, looking up the Student and Course
    private Enrollment mapRow(ResultSet rs) throws SQLException {
        Student student = studentDAO.getStudentById(rs.getInt("student_id"));
        Course course = courseDAO.getCourseById(rs.getInt("course_id"));

        try {
            Enrollment enrollment = new Enrollment(rs.getInt("id"), student, course);
            String grade = rs.getString("grade");
            if (grade != null) {
                enrollment.setGrade(grade);
            }
            return enrollment;
        } catch (InvalidEnrollmentException e) {
            System.out.println("Skipping invalid enrollment row: " + e.getMessage());
            return null;
        }
    }
}
