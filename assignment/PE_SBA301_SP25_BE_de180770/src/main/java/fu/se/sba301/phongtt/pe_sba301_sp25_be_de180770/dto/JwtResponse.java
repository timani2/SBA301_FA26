package fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String memberID;
    private Integer role; // Trả về để FE biết là Admin(1), Staff(2) hay Member(3)
}