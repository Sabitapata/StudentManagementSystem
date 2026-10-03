package app;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/RegisterServlet")
public class RegisterServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    // Update these to match your setup
    private static final String URL = "jdbc:mysql://localhost:3306/student_management_system";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "sabita@1234"; 

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String department = request.getParameter("department");

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        // Basic server-side validation (never trust the client alone)
        if (name == null || name.trim().isEmpty() ||
            email == null || email.trim().isEmpty() ||
            password == null || password.trim().isEmpty()) {
            out.println("<h2>Registration Failed</h2>");
            out.println("<p>All fields are required.</p>");
            out.println("<a href='register.html'>Go back</a>");
            return;
        }

        String sql = "INSERT INTO students (name, email, password, department) VALUES (?, ?, ?, ?)";

        try (Connection conn = DriverManager.getConnection(URL, DB_USER, DB_PASSWORD);
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, name);
            stmt.setString(2, email);
            stmt.setString(3, password);
            stmt.setString(4, department);

            int rows = stmt.executeUpdate();

            if (rows > 0) {
                out.println("<h2>Registration Successful!</h2>");
                out.println("<p>Welcome, " + name + ". You can now <a href='login.html'>login</a>.</p>");
            }

        } catch (SQLIntegrityConstraintViolationException e) {
          
            out.println("<h2>Registration Failed</h2>");
            out.println("<p>An account with this email already exists.</p>");
            out.println("<a href='register.html'>Try again</a>");

        } catch (SQLException e) {
            out.println("<h2>Server Error</h2>");
            out.println("<p>" + e.getMessage() + "</p>");
            e.printStackTrace();
        }
    }
}
