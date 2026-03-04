package fu.se.sba301.phongtt.a3tatanphong_se18d04.controllers;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.request.RoomTypeRequest;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response.ApiResponse;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response.RoomTypeResponse;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.services.RoomTypeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class RoomTypeController {

    private final RoomTypeService roomTypeService;

    // PUBLIC
    @GetMapping("/room-types")
    public ApiResponse<List<RoomTypeResponse>> getAll() {
        return new ApiResponse<>(
                "Get room types successfully",
                roomTypeService.getAll()
        );
    }

    // STAFF
    @PostMapping("/staff/room-types")
    public ApiResponse<RoomTypeResponse> create(
            @Valid @RequestBody RoomTypeRequest request) {

        return new ApiResponse<>(
                "Create room type successfully",
                roomTypeService.create(request)
        );
    }

    @PutMapping("/staff/room-types/{id}")
    public ApiResponse<RoomTypeResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody RoomTypeRequest request) {

        return new ApiResponse<>(
                "Update room type successfully",
                roomTypeService.update(id, request)
        );
    }

    @DeleteMapping("/staff/room-types/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        roomTypeService.delete(id);
        return new ApiResponse<>("Delete successfully", null);
    }
}