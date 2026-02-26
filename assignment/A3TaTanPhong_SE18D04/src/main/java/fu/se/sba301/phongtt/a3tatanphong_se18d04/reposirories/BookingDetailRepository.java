package fu.se.sba301.phongtt.a3tatanphong_se18d04.reposirories;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.BookingDetail;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.BookingDetailId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingDetailRepository extends JpaRepository<BookingDetail, BookingDetailId> {
    boolean existsByRoomId(Integer roomId);
    // Lưu ý: Sử dụng BookingDetailId đã tạo ở bước trước làm kiểu dữ liệu cho ID
}