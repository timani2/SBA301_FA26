package fu.se.sba301.phongtt.a3tatanphong_se18d04.controllers;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.RoomInformation;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {
    @Autowired
    private RoomService roomService;

    // Xem danh sách phòng (Công khai - Không cần login)
    @GetMapping
    public List<RoomInformation> getAllRooms() {
        return roomService.getAllRoomsForView();
    }

    // Staff thêm mới hoặc cập nhật phòng
    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_STAFF')")
    public RoomInformation saveRoom(@RequestBody RoomInformation room) {
        return roomService.saveRoom(room);
    }

    // Staff xóa phòng (Logic xóa mềm/cứng trong Service) [cite: 50, 60]
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_STAFF')")
    public ResponseEntity<?> deleteRoom(@PathVariable Integer id) {
        roomService.deleteRoom(id);
        return ResponseEntity.ok("Xử lý xóa/đổi trạng thái phòng thành công.");
    }
}