package fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateBookingStatusRequest {

    @NotBlank
    @Pattern(regexp = "PENDING|CONFIRMED|CANCELLED", message = "Status must be PENDING, CONFIRMED or CANCELLED")
    private String status;
}
