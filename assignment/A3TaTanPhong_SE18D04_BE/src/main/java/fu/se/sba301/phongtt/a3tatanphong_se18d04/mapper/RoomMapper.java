package fu.se.sba301.phongtt.a3tatanphong_se18d04.mapper;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.request.RoomRequest;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response.RoomResponse;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.RoomInformation;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.RoomType;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.enums.RoomStatus;

public class RoomMapper {

    public static RoomInformation toEntity(RoomRequest request, RoomType roomType) {
        return RoomInformation.builder()
                .roomNumber(request.getRoomNumber())
                .roomType(roomType)
                .status(RoomStatus.AVAILABLE)
                .build();
    }

    public static RoomResponse toResponse(RoomInformation room) {
        return new RoomResponse(
                room.getRoomId(),
                room.getRoomNumber(),
                room.getStatus().name(),
                room.getRoomType().getName(),
                room.getRoomType().getPrice()
        );
    }
}