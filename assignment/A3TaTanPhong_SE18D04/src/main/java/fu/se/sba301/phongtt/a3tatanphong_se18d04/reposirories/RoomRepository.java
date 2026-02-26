package fu.se.sba301.phongtt.a3tatanphong_se18d04.reposirories;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.RoomInformation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<RoomInformation, Integer> {
    // Tìm các phòng theo trạng thái (ví dụ: chỉ hiện phòng đang Active - status 1)
    List<RoomInformation> findByRoomStatus(Integer status);

    // Tìm phòng theo số phòng
    Optional<RoomInformation> findByRoomNumber(String roomNumber);
}