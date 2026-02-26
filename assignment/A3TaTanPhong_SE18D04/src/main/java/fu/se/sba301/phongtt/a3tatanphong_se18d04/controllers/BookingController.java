package fu.se.sba301.phongtt.a3tatanphong_se18d04.controllers;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.BookingReservation;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    // Customer tạo đơn đặt phòng mới [cite: 54, 64]
    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_CUSTOMER')")
    public BookingReservation createBooking(@RequestBody BookingReservation booking) {
        return bookingService.createBooking(booking);
    }

    // Customer xem lịch sử đặt phòng của mình
    @GetMapping("/my-history/{customerId}")
    @PreAuthorize("hasAuthority('ROLE_CUSTOMER')")
    public List<BookingReservation> getMyHistory(@PathVariable Integer customerId) {
        return bookingService.getHistoryByCustomer(customerId);
    }

    // Staff quản lý tất cả các đơn đặt phòng [cite: 51, 61]
    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_STAFF')")
    public List<BookingReservation> getAllBookings() {
        return bookingService.getAllBookings();
    }
}