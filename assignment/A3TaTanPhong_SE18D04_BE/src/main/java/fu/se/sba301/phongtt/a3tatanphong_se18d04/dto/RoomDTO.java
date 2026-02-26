package fu.se.sba301.phongtt.a3tatanphong_se18d04.dto;

import lombok.Data;

@Data
public class RoomDTO {
    private Integer roomId;
    private String roomNumber;
    private String roomDetailDescription;
    private Integer roomMaxCapacity;
    private Double roomPricePerDay;
    private String roomTypeName; // Lấy từ Entity RoomType
    private Integer roomStatus; }