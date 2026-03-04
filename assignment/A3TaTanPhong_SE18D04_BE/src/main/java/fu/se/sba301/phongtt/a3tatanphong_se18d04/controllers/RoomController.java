package fu.se.sba301.phongtt.a3tatanphong_se18d04.controllers;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.request.RoomRequest;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response.ApiResponse;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response.RoomResponse;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.services.RoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    // PUBLIC
    @GetMapping("/rooms")
    public ApiResponse<List<RoomResponse>> getAll() {
        return new ApiResponse<>(
                "Get rooms successfully",
                roomService.getAll()
        );
    }

    // STAFF
    @PostMapping("/staff/rooms")
    public ApiResponse<RoomResponse> create(
            @Valid @RequestBody RoomRequest request) {

        return new ApiResponse<>(
                "Create room successfully",
                roomService.create(request)
        );
    }

    @PutMapping("/staff/rooms/{id}")
    public ApiResponse<RoomResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody RoomRequest request) {

        return new ApiResponse<>(
                "Update room successfully",
                roomService.update(id, request)
        );
    }

    @DeleteMapping("/staff/rooms/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        roomService.delete(id);
        return new ApiResponse<>("Delete successfully", null);
    }
}