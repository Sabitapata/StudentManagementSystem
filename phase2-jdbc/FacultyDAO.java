package app;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class FacultyDAO {

    public void addFaculty(Faculty faculty) {
        String sql = "INSERT INTO faculty (name, email, password, department) VALUES (?, ?, ?, ?)";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, faculty.getName());
            stmt.setString(2, faculty.getEmail());
            stmt.setString(3, faculty.getPassword());
            stmt.setString(4, faculty.getDepartment());

            int rows = stmt.executeUpdate();
            System.out.println(rows + " faculty member(s) inserted.");

        } catch (SQLException e) {
            System.out.println("Error inserting faculty:");
            e.printStackTrace();
        }
    }

    public List<Faculty> getAllFaculty() {
        List<Faculty> facultyList = new ArrayList<>();
        String sql = "SELECT * FROM faculty";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                facultyList.add(mapRow(rs));
            }

        } catch (SQLException e) {
            System.out.println("Error fetching faculty:");
            e.printStackTrace();
        }

        return facultyList;
    }

    public Faculty getFacultyById(int id) {
        String sql = "SELECT * FROM faculty WHERE id = ?";
        Faculty faculty = null;

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    faculty = mapRow(rs);
                }
            }

        } catch (SQLException e) {
            System.out.println("Error fetching faculty:");
            e.printStackTrace();
        }

        return faculty;
    }

    // Helper to build a Faculty object from a ResultSet row
    private Faculty mapRow(ResultSet rs) throws SQLException {
        return new Faculty(
                rs.getInt("id"),
                rs.getString("name"),
                rs.getString("email"),
                rs.getString("password"),
                rs.getString("department")
        );
    }
}
