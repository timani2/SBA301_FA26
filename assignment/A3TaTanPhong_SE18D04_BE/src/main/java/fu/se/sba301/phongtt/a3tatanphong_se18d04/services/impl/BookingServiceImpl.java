package fu.se.sba301.phongtt.a3tatanphong_se18d04.services.impl;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.request.BookingRequest;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response.BookingResponse;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.BookingDetail;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.BookingReservation;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.Customer;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.RoomInformation;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.enums.BookingStatus;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.exception.AppException;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.exception.ErrorCode;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.mapper.BookingMapper;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.reposirories.BookingRepository;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.reposirories.CustomerRepository;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.reposirories.RoomRepository;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.services.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final CustomerRepository customerRepository;

    @Override
    public BookingResponse createBooking(String email, BookingRequest request) {

        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.CUSTOMER_NOT_FOUND));

        BookingReservation booking = BookingReservation.builder()
                .bookingDate(LocalDate.now())
                .checkInDate(request.getCheckInDate())
                .checkOutDate(request.getCheckOutDate())
                .status(BookingStatus.PENDING)
                .customer(customer)
                .build();

        List<BookingDetail> details = request.getRoomIds().stream().map(roomId -> {

            RoomInformation room = roomRepository.findById(roomId)
                    .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));

            BookingDetail detail = BookingDetail.builder()
                    .booking(booking)
                    .room(room)
                    .priceAtBooking(room.getRoomType().getPrice())
                    .build();

            return detail;

        }).toList();

        booking.setBookingDetails(details);

        double total = details.stream()
                .mapToDouble(BookingDetail::getPriceAtBooking)
                .sum();

        booking.setTotalAmount(total);

        bookingRepository.save(booking);

        return BookingMapper.toResponse(booking);
    }

    @Override
    public List<BookingResponse> getMyBookings(String email) {

        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.CUSTOMER_NOT_FOUND));

        return bookingRepository.findByCustomer(customer)
                .stream()
                .map(BookingMapper::toResponse)
                .toList();
    }

    @Override
    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(BookingMapper::toResponse)
                .toList();
    }
}