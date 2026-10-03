package app;
public class Course {
    private int id;
    private String name;
    private int credits;
    private Faculty faculty; // association: course taught by a faculty

    public Course(int id, String name, int credits, Faculty faculty) {
        this.id = id;
        this.name = name;
        this.credits = credits;
        this.faculty = faculty;
    }

    public int getId() { return id; }
    public String getName() { return name; }
    public int getCredits() { return credits; }
    public Faculty getFaculty() { return faculty; }

    public void setName(String name) { this.name = name; }
    public void setCredits(int credits) { this.credits = credits; }
    public void setFaculty(Faculty faculty) { this.faculty = faculty; }

    @Override
    public String toString() {
        String facultyName = (faculty != null) ? faculty.getName() : "Unassigned";
        return "Course[" + id + "] " + name + " (" + credits + " credits) - Faculty: " + facultyName;
    }
}
