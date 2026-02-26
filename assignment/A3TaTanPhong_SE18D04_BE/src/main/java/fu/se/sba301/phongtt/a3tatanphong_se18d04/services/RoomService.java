package fu.se.sba301.phongtt.a3tatanphong_se18d04.services;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.RoomInformation;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.reposirories.BookingDetailRepository;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.reposirories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private BookingDetailRepository bookingDetailRepository;

    public List<RoomInformation> getAllRoomsForView() {
        return roomRepository.findAll();
    }

    public RoomInformation saveRoom(RoomInformation room) {
        return roomRepository.save(room);
    }

    public void deleteRoom(Integer roomId) {
        RoomInformation room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phòng"));

        // Kiểm tra xem phòng có nằm trong bất kỳ giao dịch nào không
        boolean hasBookingDetails = bookingDetailRepository.existsByRoomInformation_RoomId(roomId);

        if (hasBookingDetails) {
            // Nếu đã có giao dịch, chỉ thay đổi trạng thái sang 0 (Deleted/Inactive)
            room.setRoomStatus(0);
            roomRepository.save(room);
        } else {
            // Nếu chưa có giao dịch, xóa hoàn toàn khỏi DB
            roomRepository.delete(room);
        }
    }
}