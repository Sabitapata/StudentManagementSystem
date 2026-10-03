package app;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CourseDAO {

    private FacultyDAO facultyDAO = new FacultyDAO();

    // Add a course. Pass the faculty's id (not the whole object) who teaches it.
    public void addCourse(String name, int credits, int facultyId) {
        String sql = "INSERT INTO courses (name, credits, faculty_id) VALUES (?, ?, ?)";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, name);
            stmt.setInt(2, credits);
            stmt.setInt(3, facultyId);

            int rows = stmt.executeUpdate();
            System.out.println(rows + " course(s) inserted.");

        } catch (SQLException e) {
            System.out.println("Error inserting course:");
            e.printStackTrace();
        }
    }

    public List<Course> getAllCourses() {
        List<Course> courses = new ArrayList<>();
        String sql = "SELECT * FROM courses";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                courses.add(mapRow(rs));
            }

        } catch (SQLException e) {
            System.out.println("Error fetching courses:");
            e.printStackTrace();
        }

        return courses;
    }

    public Course getCourseById(int id) {
        String sql = "SELECT * FROM courses WHERE id = ?";
        Course course = null;

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    course = mapRow(rs);
                }
            }

        } catch (SQLException e) {
            System.out.println("Error fetching course:");
            e.printStackTrace();
        }

        return course;
    }

    // Helper: builds a Course object, looking up its Faculty by faculty_id
    private Course mapRow(ResultSet rs) throws SQLException {
        int facultyId = rs.getInt("faculty_id");
        Faculty faculty = facultyId != 0 ? facultyDAO.getFacultyById(facultyId) : null;

        return new Course(
                rs.getInt("id"),
                rs.getString("name"),
                rs.getInt("credits"),
                faculty
        );
    }
}
