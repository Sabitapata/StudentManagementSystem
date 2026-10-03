package app;
//Inheritance: Faculty extends Person
public class Faculty extends Person {
 private String department;

 public Faculty(int id, String name, String email, String password, String department) {
     super(id, name, email, password);
     this.department = department;
 }

 public String getDepartment() { return department; }
 public void setDepartment(String department) { this.department = department; }

 @Override
 public String getRole() {
     return "Faculty";
 }

 @Override
 public String toString() {
     return super.toString() + ", Department: " + department;
 }
}
