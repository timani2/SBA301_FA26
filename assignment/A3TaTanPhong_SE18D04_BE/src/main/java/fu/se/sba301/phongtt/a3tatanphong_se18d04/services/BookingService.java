package fu.se.sba301.phongtt.a3tatanphong_se18d04.services;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.BookingReservation;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.reposirories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    // Customer tạo đơn đặt phòng mới [cite: 54, 64]
    @Transactional
    public BookingReservation createBooking(BookingReservation booking) {
        booking.setBookingDate(LocalDate.now());
        // Logic tính toán TotalPrice dựa trên danh sách BookingDetails có thể thêm ở đây [cite: 4]
        return bookingRepository.save(booking);
    }

    // Customer xem lịch sử đặt phòng của chính mình [cite: 56, 66]
    public List<BookingReservation> getHistoryByCustomer(Integer customerId) {
        return bookingRepository.findByCustomer_CustomerId(customerId);
    }

    // Staff quản lý tất cả đơn đặt phòng [cite: 51, 61]
    public List<BookingReservation> getAllBookings() {
        return bookingRepository.findAll();
    }

    public void updateStatus(Integer bookingId, Integer status) {
        BookingReservation reservation = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn đặt phòng"));

        // Cập nhật trạng thái (Ví dụ: 1-Chờ, 2-Xác nhận, 3-Hủy)
        reservation.setBookingStatus(status);
        bookingRepository.save(reservation);
    }}