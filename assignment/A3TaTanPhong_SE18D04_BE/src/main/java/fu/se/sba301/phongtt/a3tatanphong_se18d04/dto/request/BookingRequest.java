package fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.request;


import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
@Getter
@Setter
public class BookingRequest {

    @NotNull
    private LocalDate checkInDate;

    @NotNull
    private LocalDate checkOutDate;

    @NotEmpty
    private List<Long> roomIds;

    // getter & setter
}