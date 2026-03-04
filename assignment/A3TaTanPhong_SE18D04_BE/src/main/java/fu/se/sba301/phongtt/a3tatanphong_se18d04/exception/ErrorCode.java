package fu.se.sba301.phongtt.a3tatanphong_se18d04.exception;

import org.springframework.http.HttpStatus;

public enum ErrorCode {

    CUSTOMER_NOT_FOUND(HttpStatus.NOT_FOUND, "Customer not found"),
    ROOM_NOT_FOUND(HttpStatus.NOT_FOUND, "Room not found"),
    ROOMTYPE_NOT_FOUND(HttpStatus.NOT_FOUND, "Room type not found"),
    BOOKING_NOT_FOUND(HttpStatus.NOT_FOUND, "Booking not found"),

    EMAIL_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "Email already exists"),
    INVALID_CREDENTIALS(HttpStatus.BAD_REQUEST, "Invalid email or password"),

    ROOMTYPE_IN_USE(HttpStatus.BAD_REQUEST, "Room type is being used"),
    ROOM_IN_USE(HttpStatus.BAD_REQUEST, "Room is already in booking"),

    ACCESS_DENIED(HttpStatus.FORBIDDEN, "Access denied"),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "Unauthorized"),

    VALIDATION_ERROR(HttpStatus.BAD_REQUEST, "Validation error");

    private final HttpStatus status;
    private final String message;

    ErrorCode(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    public HttpStatus getStatus() { return status; }
    public String getMessage() { return message; }
}