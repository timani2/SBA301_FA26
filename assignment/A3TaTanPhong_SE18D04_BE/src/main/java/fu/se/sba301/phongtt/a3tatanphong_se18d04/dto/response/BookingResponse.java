package fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response;

import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponse {

    private Long bookingId;
    private String customerFullName;
    private LocalDate bookingDate;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String status;
    private Double totalAmount;
    private List<BookingDetailResponse> rooms;
}