package fu.se.sba301.phongtt.a3tatanphong_se18d04.entity;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingDetailId implements Serializable {
    private Integer bookingReservationId;
    private Integer roomId;
}