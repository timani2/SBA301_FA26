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

    // Xem danh sách phòng (Không cần đăng nhập) [cite: 43]
    public List<RoomInformation> getAllRoomsForView() {
        return roomRepository.findByRoomStatus(1);
    }

    public RoomInformation saveRoom(RoomInformation room) {
        return roomRepository.save(room);
    }


    // Staff xóa phòng
    public void deleteRoom(Integer roomId) {
        RoomInformation room = roomRepository.findById(roomId).orElseThrow();

        // Kiểm tra xem phòng có nằm trong giao dịch nào không
        boolean hasBooking = bookingDetailRepository.existsByRoomId(roomId);

        if (hasBooking) {
            // Nếu đã có giao dịch, chỉ đổi trạng thái sang "Deleted" (ví dụ: 2)
            room.setRoomStatus(2);
            roomRepository.save(room);
        } else {
            // Nếu chưa có giao dịch nào, xóa hoàn toàn khỏi DB
            roomRepository.delete(room);
        }
    }
}