package app;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    // Update these to match your setup
    private static final String URL = "jdbc:mysql://localhost:3306/student_management_system";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "sabita@1234"; 

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String email = request.getParameter("email");
        String password = request.getParameter("password");

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String sql = "SELECT * FROM students WHERE email = ? AND password = ?";
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            out.println("<h2>Driver class not found on classpath!</h2>");
            out.println("<p>" + e.getMessage() + "</p>");
            return;
        }

        try (Connection conn = DriverManager.getConnection(URL, DB_USER, DB_PASSWORD);
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, email);
            stmt.setString(2, password);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    
                    String name = rs.getString("name");
                    out.println("<h2>Welcome, " + name + "!</h2>");
                    out.println("<p>Login successful.</p>");
                } else {
                    out.println("<h2>Login Failed</h2>");
                    out.println("<p>Invalid email or password.</p>");
                    out.println("<a href='login.html'>Try again</a>");
                }
            }

        } catch (SQLException e) {
            out.println("<h2>Server Error</h2>");
            out.println("<p>" + e.getMessage() + "</p>");
            e.printStackTrace();
        }
    }
}
