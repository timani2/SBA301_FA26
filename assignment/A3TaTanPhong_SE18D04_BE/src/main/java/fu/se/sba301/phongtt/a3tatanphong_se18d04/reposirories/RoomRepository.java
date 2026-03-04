package fu.se.sba301.phongtt.a3tatanphong_se18d04.reposirories;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.RoomInformation;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.enums.RoomStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<RoomInformation, Long> {
}