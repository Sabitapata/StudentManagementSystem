package app;

public class InvalidEnrollmentException extends Exception {
    private static final long serialVersionUID = 1L;

    public InvalidEnrollmentException(String message) {
        super(message);
    }
}