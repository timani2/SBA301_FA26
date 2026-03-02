package fu.se.sba301.phongtt.a3tatanphong_se18d04.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String email;
    private String role; // Để FE biuết là Staff hay Cstomer mà hiển thị menu
}