package app;
public class Main {
    public static void main(String[] args) {
        // Create faculty
        Faculty prof = new Faculty(1, "Dr. Sharma", "sharma@college.edu", "pass123", "Computer Science");

        // Create course
        Course javaCourse = new Course(101, "Full Stack Java", 4, prof);

        // Create students
        Student alice = new Student(1, "Alice", "alice@college.edu", "alicepass", "Data Science");
        Student bob = new Student(2, "Bob", "bob@college.edu", "bobpass", "Data Science");

        try {
            // Enroll students
            Enrollment e1 = new Enrollment(1, alice, javaCourse);
            Enrollment e2 = new Enrollment(2, bob, javaCourse);

            alice.addEnrollment(e1);
            bob.addEnrollment(e2);

            // Assign grades
            e1.setGrade("A");
            e2.setGrade("B");

            System.out.println(prof);
            System.out.println(javaCourse);
            System.out.println(alice);
            System.out.println(e1);
            System.out.println(bob);
            System.out.println(e2);

            // Trigger custom exception on purpose
            e1.setGrade("Z"); // invalid grade

        } catch (InvalidEnrollmentException ex) {
            System.out.println("Enrollment error: " + ex.getMessage());
        } finally {
            System.out.println("Enrollment processing complete.");
        }
    }
}
