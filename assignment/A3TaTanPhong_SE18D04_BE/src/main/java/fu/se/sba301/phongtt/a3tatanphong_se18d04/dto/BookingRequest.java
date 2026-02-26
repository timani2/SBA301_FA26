package fu.se.sba301.phongtt.a3tatanphong_se18d04.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class BookingRequest {
    private List<Integer> roomIds; // Danh sách ID các phòng khách chọn
    private LocalDate startDate;
    private LocalDate endDate;
}