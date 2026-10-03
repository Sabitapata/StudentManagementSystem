package app;
public class Enrollment {
    private int id;
    private Student student;
    private Course course;
    private String grade; // null until assigned

    public Enrollment(int id, Student student, Course course) throws InvalidEnrollmentException {
        if (student == null || course == null) {
            throw new InvalidEnrollmentException("Student and course must not be null.");
        }
        this.id = id;
        this.student = student;
        this.course = course;
        this.grade = null;
    }

    public int getId() { return id; }
    public Student getStudent() { return student; }
    public Course getCourse() { return course; }
    public String getGrade() { return grade; }

    public void setGrade(String grade) throws InvalidEnrollmentException {
        // simple validation of allowed grade values
        String[] validGrades = {"A", "B", "C", "D", "F"};
        boolean valid = false;
        for (String g : validGrades) {
            if (g.equals(grade)) { valid = true; break; }
        }
        if (!valid) {
            throw new InvalidEnrollmentException("Invalid grade: " + grade);
        }
        this.grade = grade;
    }

    @Override
    public String toString() {
        return student.getName() + " enrolled in " + course.getName() +
               " | Grade: " + (grade == null ? "Not graded" : grade);
    }
}
