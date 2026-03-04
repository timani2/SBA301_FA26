package fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BookingDetailResponse {

    private Long roomId;
    private String roomNumber;
    private Double priceAtBooking;

    // constructor
    // getter
}