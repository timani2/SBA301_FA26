package fu.se.sba301.phongtt.a3tatanphong_se18d04.reposirories;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.BookingDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingDetailRepository extends JpaRepository<BookingDetail, Long> {

}