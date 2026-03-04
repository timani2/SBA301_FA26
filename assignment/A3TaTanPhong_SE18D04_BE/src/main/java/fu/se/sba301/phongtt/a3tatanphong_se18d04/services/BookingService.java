package fu.se.sba301.phongtt.a3tatanphong_se18d04.services;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.request.BookingRequest;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response.BookingResponse;

import java.util.List;

public interface BookingService {

    BookingResponse createBooking(String email, BookingRequest request);

    List<BookingResponse> getMyBookings(String email);

    List<BookingResponse> getAllBookings();
}