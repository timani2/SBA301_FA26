package fu.se.sba301.phongtt.a3tatanphong_se18d04.controllers;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.request.BookingRequest;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.request.UpdateBookingStatusRequest;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response.ApiResponse;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response.BookingResponse;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.services.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    // CUSTOMER - create booking
    @PostMapping("/customer/bookings")
    public ApiResponse<BookingResponse> createBooking(
            Authentication authentication,
            @Valid @RequestBody BookingRequest request) {

        String email = authentication.getName();

        return new ApiResponse<>(
                "Booking created successfully",
                bookingService.createBooking(email, request)
        );
    }

    // CUSTOMER - view own history
    @GetMapping("/customer/bookings")
    public ApiResponse<List<BookingResponse>> getMyBookings(
            Authentication authentication) {

        String email = authentication.getName();

        return new ApiResponse<>(
                "Get booking history successfully",
                bookingService.getMyBookings(email)
        );
    }

    // STAFF - view all bookings
    @GetMapping("/staff/bookings")
    public ApiResponse<List<BookingResponse>> getAllBookings() {

        return new ApiResponse<>(
                "Get all bookings successfully",
                bookingService.getAllBookings()
        );
    }

    // STAFF - update booking status
    @PutMapping("/staff/bookings/{id}/status")
    public ApiResponse<BookingResponse> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateBookingStatusRequest request) {

        return new ApiResponse<>(
                "Update status successfully",
                bookingService.updateStatus(id, request)
        );
    }
}