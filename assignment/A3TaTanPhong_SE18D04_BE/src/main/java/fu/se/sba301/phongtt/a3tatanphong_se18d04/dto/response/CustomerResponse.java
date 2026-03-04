package fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor

public class CustomerResponse {

    private Long customerId;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private String role;

    // constructor
    // getter
}