package fu.se.sba301.phongtt.a3tatanphong_se18d04.mapper;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response.BookingDetailResponse;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response.BookingResponse;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.BookingDetail;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.BookingReservation;

import java.util.List;

public class BookingMapper {

    public static BookingDetailResponse toDetailResponse(BookingDetail detail) {
        return new BookingDetailResponse(
                detail.getRoom().getRoomId(),
                detail.getRoom().getRoomNumber(),
                detail.getPriceAtBooking()
        );
    }

    public static BookingResponse toResponse(BookingReservation booking) {

        List<BookingDetailResponse> roomResponses =
                booking.getBookingDetails()
                        .stream()
                        .map(BookingMapper::toDetailResponse)
                        .toList();

        String customerFullName = booking.getCustomer() != null
                ? booking.getCustomer().getFullName()
                : null;

        return new BookingResponse(
                booking.getBookingId(),
                customerFullName,
                booking.getBookingDate(),
                booking.getCheckInDate(),
                booking.getCheckOutDate(),
                booking.getStatus().name(),
                booking.getTotalAmount(),
                roomResponses
        );
    }
}