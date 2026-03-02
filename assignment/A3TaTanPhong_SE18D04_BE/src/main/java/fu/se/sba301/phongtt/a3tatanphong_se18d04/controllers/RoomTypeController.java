package fu.se.sba301.phongtt.a3tatanphong_se18d04.controllers;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.RoomType;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.reposirories.RoomTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/room-types")
public class RoomTypeController {

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @GetMapping
    public List<RoomType> getAllRoomTypes() {
        return roomTypeRepository.findAll();
    }
}