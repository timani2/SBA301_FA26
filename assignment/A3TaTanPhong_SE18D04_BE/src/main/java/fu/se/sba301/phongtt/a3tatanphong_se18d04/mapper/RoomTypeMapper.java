package fu.se.sba301.phongtt.a3tatanphong_se18d04.mapper;


import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.request.RoomTypeRequest;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response.RoomTypeResponse;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.RoomType;

public class RoomTypeMapper {

    public static RoomType toEntity(RoomTypeRequest request) {
        return RoomType.builder()
                .name(request.getTypeName())
                .description(request.getDescription())
                .price(request.getPrice())
                .build();
    }

    public static RoomTypeResponse toResponse(RoomType roomType) {
        return new RoomTypeResponse(
                roomType.getId(),
                roomType.getName(),
                roomType.getDescription(),
                roomType.getPrice()
        );
    }

    public static void updateEntity(RoomType roomType, RoomTypeRequest request) {
        roomType.setName(request.getTypeName());
        roomType.setDescription(request.getDescription());
        roomType.setPrice(request.getPrice());
    }
}