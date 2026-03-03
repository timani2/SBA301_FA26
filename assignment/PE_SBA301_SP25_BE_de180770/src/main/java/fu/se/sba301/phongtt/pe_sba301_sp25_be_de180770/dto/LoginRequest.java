package fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.dto;


import lombok.Data;

@Data
public class LoginRequest {
    private String memberID; // Khớp với nvarchar(20)
    private String password;
}