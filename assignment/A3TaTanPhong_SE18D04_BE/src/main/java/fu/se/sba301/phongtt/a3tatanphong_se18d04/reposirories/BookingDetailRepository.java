package fu.se.sba301.phongtt.a3tatanphong_se18d04.reposirories;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.BookingDetail;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.BookingDetailId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingDetailRepository extends JpaRepository<BookingDetail, BookingDetailId> {
    // Kiểm tra xem phòng đã từng được đặt chưa
    boolean existsByRoomInformation_RoomId(Integer roomId);
}