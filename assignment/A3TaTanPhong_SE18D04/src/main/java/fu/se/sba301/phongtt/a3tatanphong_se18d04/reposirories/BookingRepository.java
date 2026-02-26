package fu.se.sba301.phongtt.a3tatanphong_se18d04.reposirories;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.BookingReservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<BookingReservation, Integer> {
    // Tìm lịch sử đặt phòng của một khách hàng cụ thể
    List<BookingReservation> findByCustomer_CustomerId(Integer customerId);
}