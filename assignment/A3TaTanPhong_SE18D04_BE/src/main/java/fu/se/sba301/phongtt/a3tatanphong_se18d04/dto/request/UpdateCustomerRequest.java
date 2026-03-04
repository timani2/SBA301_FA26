package fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.request;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateCustomerRequest {

    @NotBlank
    private String fullName;

    private String phone;

    private String address;

    // getter & setter
}